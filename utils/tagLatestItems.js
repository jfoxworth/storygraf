import { getTagLatestItems } from "./api/tagLatestItems";
import {
  createTagLatestItems,
  updateTagLatestItems,
} from "./api/tagLatestItems";

/* 
  This function is called when a new item is added to a tag. The function checks
  the latest item entry and if the date of the item is later than the any of the
  latest 5 items (or 10 for a top item) then it is added to that list so that it
  can be viewed in a graf.
*/
const setLatestItems = async (tagId, itemList, parentTagId) => {
  console.log("Setting latest items for " + tagId);
  const articleLimit = parentTagId === 0 ? 8 : 5;
  const latestItems = await getTagLatestItems(tagId);
  const articles =
    latestItems === "Empty"
      ? itemList
      : [...JSON.parse(latestItems).data.items, ...itemList];
  const filteredArticles = articles
    .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
    .sort((a, b) =>
      a.itemDate < b.item_date ? 1 : b.itemDate < a.itemDate ? -1 : 0
    )
    .slice(0, articleLimit);

  if (latestItems === "Empty") {
    await createTagLatestItems({ tagId, items: filteredArticles, parentTagId });
    if (parentTagId) {
      setLatestItems(parentTagId, itemList);
    }
  } else {
    let changed = false;
    filteredArticles.forEach((fArt, index) => {
      if (fArt.id !== JSON.parse(latestItems).data.items[index].id) {
        changed = true;
      }
    });
    if (changed) {
      console.log("Updating latest items");
      updateTagLatestItems({
        ...latestItems,
        data: { ...JSON.parse(latestItems).data, items: filteredArticles },
      });
      if (JSON.parse(latestItems).data.parentTagId) {
        setLatestItems(JSON.parse(latestItems).data.parentTagId, itemList);
      }
    }
  }
};

export { setLatestItems };
