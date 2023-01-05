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

const checkChildTagProperties = (parentTag, childTags, updateTag) => {
  console.log(parentTag);
  console.log(childTags);
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
    console.log("Updating parent");
    console.log(parentTag);
    updateTag(parentTag);
  }
  return childTags;
};

export { checkTagItemDates, checkChildTagProperties };
