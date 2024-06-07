// eslint-disable-next-line import/no-unresolved
import { SELF } from "cloudflare:test";

describe("OGP Fetch Worker", () => {
  it("should return 400 when url is not provided", async () => {
    const response = await SELF.fetch("http://localhost");
    expect(response.status).toBe(400);
  });

  it("should return 200 when url is provided", async () => {
    const response = await SELF.fetch(
      "http://localhost?url=https://monica-dev.com",
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/json");
    expect(await response.json()).toEqual({
      title: "Monica&#39;s Portfolio",
      description:
        "Webエンジニア Monica のポートフォリオサイトです。経歴やスキル、制作物などを掲載しています。",
      imageUrl: "https://monica-dev.com/assets/ogp/default.png",
      faviconUrl: "https://monica-dev.com/favicon.ico",
    });
  });
});
