// Checks the "latest" articles for a tag and if the article being
// inserted is newer than the ones there, it inserts the article.
const checkTagItemDates = (tag, item, tagTreeLoc) => {
  let temp = JSON.parse(JSON.stringify(tag.data.articlesList));
  if (tag.data.articlesList.length === 0) {
    tag.data.articlesList.splice(0, 0, item);
    return tag;
  }
  let flag = false;
  let position = 0;
  tag.data.articlesList.every((tagArticle, i) => {
    if (new Date(item.itemDate) > new Date(tagArticle.itemDate)) {
      flag = true;
      position = i;
      return false;
    } else {
      return true;
    }
  });
  if (flag) {
    tag.data.articlesList.splice(position, 0, item);
    if (tag.data.articlesList.length > tag.data.articlesListLimit || 5) {
      tag.data.articlesList.splice(tag.data.articlesList.length - 1, 1);
    }
    tag.data.articlesList = tag.data.articlesList;
    return tag;
  } else {
    return false;
  }
};

export { checkTagItemDates };
