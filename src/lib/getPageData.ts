import { readItems, readSingleton } from "@directus/sdk";
import directus from "./directus";

const defaultFields = [
  "*",
  {
    blocks: [
      "id",
      "collection",
      {
        item: [
          "*",
          { stats: ["*", { stats_card_id: ["*"] }] },
          { images: ["*"] },
          {
            buttons: [
              "*",
              {
                button_id: ["*"],
              },
            ],
          },
          {
            cards: [
              "*",
              {
                our_mission_card_id: ["*"],
                our_program_card_id: ["*"],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getPages = async () => {
  try {
    const queryObj = {
      fields: defaultFields,
    };

    //@ts-ignore
    const data: any = await directus.request(readItems("pages", queryObj));

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
};

export const getSinglePage = async (
  collection: string,
  slugOrPermalink: string
) => {
  try {
    const queryObj = {
      fields: defaultFields,
      filter: {
        status: { _eq: "published" },
        slug: {
          _eq: `/${slugOrPermalink.replace(/^\//, "")}`,
        },
      },
      limit: 1,
    };

    //@ts-ignore
    const data: any = await directus.request(readItems(collection, queryObj));

    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
};

export const getNavbar = async () => {
  try {
    const data: any = await directus.request(
      readSingleton("header", {
        fields: ["*", { button: ["*"] }],
      })
    );

    return data || null;
  } catch (error) {
    console.error("Error fetching navbar:", error);
    return null;
  }
};

export const getFooter = async () => {
  try {
    const data: any = await directus.request(
      readSingleton("footer", {
        fields: ["*", { list: ["*", { footer_nav_id: ["*"] }] }],
      })
    );

    return data || null;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
};
