// Checks the "latest" articles for a tag and if the article being
// inserted is newer than the ones there, it inserts the article.
const checkTagItemDates = (tag, item, updateTag, getTagInfo) => {
  console.log("Going through the checkTagItemDates with ...");
  console.log(tag);
  console.log(item);
  let flag = false;
  let position = 0;

  // If this is the first time an article has been inserted into the articlesList
  if (tag.data.articlesList.length < tag.data.articlesListLimit || 5) {
    position = tag.data.articlesList.length;
    flag = true;
  }

  // Step through list, mark if / where the article should be inserted
  tag.data.articlesList.every((tagArticle, i) => {
    if (new Date(item.itemDate) > new Date(tagArticle.itemDate)) {
      flag = true;
      position = i;
      return false;
    } else {
      return true;
    }
  });

  // If the article should be inserted, do so at that location and update tag
  if (flag) {
    tag.data.articlesList.splice(position, 0, item);
    if (tag.data.articlesList.length > tag.data.articlesListLimit || 5) {
      tag.data.articlesList.splice(tag.data.articlesList.length, 1);
    }
    console.log("Updating the tag");
    console.log(tag);
    updateTag(tag);

    // After the update, check the next higher tag to see if this article
    // qualifies to be inserted there as well
    if (tag.data.tagTree.length) {
      console.log("Gonna query again with ...");
      console.log(
        tag.data.tagTree[tag.data.tagTree.length - 1].parent_tag_id +
          " - " +
          tag.data.tagTree[tag.data.tagTree.length - 1].id
      );
      getTagInfo(
        tag.data.tagTree[tag.data.tagTree.length - 1].parent_tag_id,
        tag.data.tagTree[tag.data.tagTree.length - 1].id
      ).then((data) => {
        checkTagItemDates(JSON.parse(data), item, updateTag, getTagInfo);
        console.log("Returned and recalled checkTagItemDates with ...");
        console.log(JSON.parse(data));
      });
    }
  }
};

// The intent of this function is to check the children of the parent tag and allow
// any changes to propagate up and down. The code steps through all children and
// compares the name, color, and text color of the items within the tag stacks.
// If the updated date is later the older item is updated with the new changes.
// Note that this is not checking the cumulative data. It is only a check on the
// properties for the tag

const checkChildTagProperties = (parentTag, childTags, updateTag) => {
  let parentFlag = false;
  let flagArray = [];
  childTags.forEach((childTag, i) => {
    flagArray[i] = false;
    childTag.data.tagTree.forEach((tagTreeItem, j) => {
      // Test if parent tag changes need to propagate
      if (tagTreeItem.id === parentTag.id) {
        if (parentTag.updated_at > tagTreeItem.updated_at) {
          flagArray[i] = true;
          console.log("Parent older than tree item");
          childTags[i].data.tagTree[j] = {
            ...parentTag,
            articlesList: [],
            tagTree: [],
            cumulatives: [],
          };
        }
      }

      // Test if tagTree Items need to propagate
      parentTag.data.tagTree.forEach((pTagTreeItem, k) => {
        if (tagTreeItem.id === pTagTreeItem.id) {
          if (pTagTreeItem.updated_at > tagTreeItem.updated_at) {
            console.log("Parent older than tree item");
            flagArray[i] = true;
            childTags[i].data.tagTree[j] = { ...pTagTreeItem };
          }
          if (tagTreeItem.updated_at > pTagTreeItem.updated_at) {
            console.log("Tree item older than parent");
            parentFlag = true;
            parentTag.data.tagTree[k] = { ...childTags[i].data.tagTree[j] };
          }
        }
      });
    });
  });
  flagArray.forEach((flag, i) => {
    if (flag) {
      console.log("Updating");
      updateTag(childTags[i]);
    }
  });
  if (parentFlag) {
    updateTag(parentTag);
  }
  return childTags;
};

/*
    This function responds to changes to a cumulatives name, color, or other property
    that is stored and edited as a tag property but needs to be updated on the 
    cumulative item in response to changes there. 
*/
const syncCumulativeProperties = (thisTag, cumulatives, updateCumulative) => {
  thisTag.data.cumulatives.forEach((tagCum) => {
    cumulatives.forEach((cumItem, cii) => {
      if (tagCum.cumId === cumItem.id) {
        updateCumulative({
          ...cumItem,
          data: { ...cumItem.data, text: tagCum.text, color: tagCum.color },
        });
      }
    });
  });
};

/*
    This function takes in the child tags and child articles for a given tag as well as
    the cumulative items for a tag. It checks the entries for each article within the
    cumulative item and keeps a running total. At the end, it updates the tag value.
*/
const syncCumulativeValues = (
  thisTag,
  childTags,
  childArticles,
  cumulatives,
  updateTag,
  updateCumulative
) => {
  console.log("In check cumulative values");
  console.log(cumulatives);
  const tempCumulatives = [];
  cumulatives.forEach((cumItem, cii) => {
    console.log("The cumItem is ...");
    console.log(cumItem);
    const cumulativeItem = {
      ...cumItem,
    };
    var changeFlag = false;
    childTags.forEach((tag, ti) => {
      // Add cumlative item for this tag
    });
    childArticles.forEach((art, ai) => {
      art.data?.cumulatives?.forEach((artCumItem) => {
        if (cumItem.data.text === artCumItem.text) {
          if (cumulativeItem.data.numData[art.id] !== artCumItem.value) {
            cumulativeItem.data.numData[art.id] = parseFloat(artCumItem.value);
            changeFlag = true;
          }
        }
      });
    });
    if (changeFlag) {
      var thisTotal = 0;
      for (const [key, value] of Object.entries(cumulativeItem.data.numData)) {
        thisTotal = thisTotal + value;
      }
      updateCumulative({
        ...cumulativeItem,
        data: { ...cumulativeItem.data, value: thisTotal },
      });
    }
    console.log("The cumulativeItem is ...");
    console.log(cumulativeItem);
    tempCumulatives.push(cumulativeItem);
  });

  console.log(tempCumulatives);

  let testFlag = false;
  let tempTagCumulatives = [];
  tempCumulatives.forEach((tempCum, ci) => {
    thisTag.data?.cumulatives?.forEach((tagCum) => {
      console.log(tempCum.data.text + " === " + tagCum.text);
      if (tempCum.data.text === tagCum.text) {
        console.log(
          tempCum.data.text +
            " - " +
            tempCum.data.value +
            " : " +
            tagCum.text +
            " - " +
            tagCum.value
        );
        if (tempCum.data.value !== tagCum.value) {
          testFlag = true;
        }
      }
    });
    console.log("------------------------------");
    console.log(tempCum);
    tempTagCumulatives.push({
      text: tempCum.data.text,
      color: tempCum.data.color,
      value: tempCum.data.value,
      cumId: tempCum.id,
    });
  });
  if (testFlag) {
    console.log("Updating tag");
    console.log({
      ...thisTag,
      data: { ...thisTag.data, cumulatives: tempTagCumulatives },
    });
    updateTag({
      ...thisTag,
      data: { ...thisTag.data, cumulatives: tempTagCumulatives },
    });
  }
};

export {
  checkTagItemDates,
  checkChildTagProperties,
  syncCumulativeValues,
  syncCumulativeProperties,
};
