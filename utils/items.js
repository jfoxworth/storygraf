/*
  This function is called after data is scraped from an article. It parses through the data 
  that is returned and sets the array of dates that are set within the article data so that
  the user can select the correct one.

  inputs : data - the data returned from the scrape
  setDateArray - useState function to set the array of available dates
  setItem - useState function to set the article data

*/

const parseArticleData = (
  data,
  setDateArray,
  item,
  setItem,
  tag,
  sourceData,
  setSource,
  userData
) => {
  const url = data.ogUrl ? data.ogUrl : data.eURL;
  const title = data.ogTitle
    ? data.ogTitle
    : data.dcTitle
    ? data.dcTitle
    : data.twitterTitle
    ? data.twitterTitle
    : "";
  const tempDateArray = [{ label: "Enter Value", value: "enter" }];
  if (data.articlePublishedTime) {
    tempDateArray.push({
      label: "Published Time - " + data.articlePublishedTime,
      value: data.articlePublishedTime,
    });
  }
  if (data.ogDate) {
    tempDateArray.push({
      label: "Open Graph Date - " + data.ogDate,
      value: data.ogDate,
    });
  }
  if (data.dcDate) {
    tempDateArray.push({
      label: "dc Date - " + data.dcDate,
      value: data.dcDate,
    });
  }
  if (data.dcDateIssued) {
    tempDateArray.push({
      label: "dc Date Issued - " + data.dcDateIssued,
      value: data.dcDateIssued,
    });
  }
  if (data.published) {
    tempDateArray.push({
      label: "published - " + data.published,
      value: data.published,
    });
  }
  setDateArray(tempDateArray);
  const articleDate = data.articlePublishedTime
    ? new Date(data.articlePublishedTime)
    : data.published
    ? new Date(data.published)
    : data.ogDate
    ? new Date(data.ogDate)
    : data.dcDate
    ? new Date(data.dcDate)
    : data.dcDateIssued
    ? new Date(data.dcDateIssued)
    : new Date();
  const description = data.ogDescription
    ? data.ogDescription
    : data.dcDescription
    ? data.dcDescription
    : "";
  const image = data.ogImage;
  const site_name = data.ogSiteName
    ? data.ogSiteName
    : data.dcPublisher
    ? data.dcPublisher
    : data.dcSource
    ? data.dcSource
    : "";
  const type = data.ogType ? data.ogType : "";
  const author = data.dcCreator;
  let artSource = "";
  sourceData.forEach((source, i) => {
    if (url.includes(source.data.sourceUrl)) {
      artSource = source;
      setSource(source);
    }
  });
  setItem({
    ...item,
    type: "ARTICLE",
    itemDate: articleDate,
    data: {
      ...data,
      dateMethod: "",
      articleDate: articleDate,
      description: description,
      title: title,
      url: url,
      image: image,
      site_name: site_name,
      type: type,
      author: author,
      source: artSource,
      userDescription: "",
    },
    parent_tag_id: tag.id,
    sourceId: artSource.id,
  });
};

export { parseArticleData };
