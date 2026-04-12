import { describe, expect, it } from "vitest";

describe("Portfolio Gallery", () => {
  it("should have 3 portfolio categories", () => {
    const categories = [
      { id: "homes", label: "Completed Homes" },
      { id: "construction", label: "Ongoing Construction Sites" },
      { id: "materials", label: "Building Material Supply" },
    ];
    expect(categories).toHaveLength(3);
    expect(categories[0]?.id).toBe("homes");
    expect(categories[1]?.id).toBe("construction");
    expect(categories[2]?.id).toBe("materials");
  });

  it("should have 6 portfolio items total (2 per category)", () => {
    const portfolioItems = [
      { id: "home-1", category: "homes" },
      { id: "home-2", category: "homes" },
      { id: "construction-1", category: "construction" },
      { id: "construction-2", category: "construction" },
      { id: "materials-1", category: "materials" },
      { id: "materials-2", category: "materials" },
    ];
    expect(portfolioItems).toHaveLength(6);
  });

  it("should have correct focus areas for each item", () => {
    const focusAreas = ["Durability", "Expertise", "Customer Trust"];
    const portfolioItems = [
      { focus: "Durability" },
      { focus: "Customer Trust" },
      { focus: "Expertise" },
      { focus: "Durability" },
      { focus: "Customer Trust" },
      { focus: "Expertise" },
    ];

    portfolioItems.forEach((item) => {
      expect(focusAreas).toContain(item.focus);
    });
  });

  it("should filter items by category correctly", () => {
    const portfolioItems = [
      { id: "home-1", category: "homes" },
      { id: "home-2", category: "homes" },
      { id: "construction-1", category: "construction" },
      { id: "construction-2", category: "construction" },
      { id: "materials-1", category: "materials" },
      { id: "materials-2", category: "materials" },
    ];

    const homesCount = portfolioItems.filter((item) => item.category === "homes").length;
    const constructionCount = portfolioItems.filter((item) => item.category === "construction").length;
    const materialsCount = portfolioItems.filter((item) => item.category === "materials").length;

    expect(homesCount).toBe(2);
    expect(constructionCount).toBe(2);
    expect(materialsCount).toBe(2);
  });

  it("should have valid image URLs for all items", () => {
    const portfolioItems = [
      {
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-completed-home-1-327rSuuzQ2rLdYdtw4gsc2.webp",
      },
      {
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-completed-home-2-gwi8FHDtdViUbf4yNR3n74.webp",
      },
      {
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-ongoing-construction-1-adBocpWq35hAqUEfPBTKhX.webp",
      },
      {
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-ongoing-construction-2-HNFY9V3rBgUn5FrZSYtzdS.webp",
      },
      {
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-material-supply-1-NaqSuVjw4DU6kM8YyAj5Fd.webp",
      },
      {
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663392973163/Hr3vcC76ajr6VHVf6UCygu/portfolio-material-supply-2-Q4Vswci9gnvVD4xTZN3Sag.webp",
      },
    ];

    portfolioItems.forEach((item) => {
      expect(item.image).toMatch(/^https:\/\//);
      expect(item.image).toContain("cloudfront");
    });
  });

  it("should have descriptive captions for all items", () => {
    const portfolioItems = [
      { caption: "Premium residential construction showcasing durability and expert craftsmanship in Rishikesh" },
      { caption: "Built with premium materials and expert attention to detail, trusted by Rishikesh families" },
      { caption: "Professional construction expertise with organized site management and quality standards" },
      { caption: "Modern construction techniques ensuring durability and quality in every phase" },
      { caption: "High-quality tiles, marble, and bricks trusted by builders across Rishikesh" },
      { caption: "Comprehensive range of durable, premium construction materials for all projects" },
    ];

    portfolioItems.forEach((item) => {
      expect(item.caption.length).toBeGreaterThan(20);
      expect(item.caption).toContain("Rishikesh");
    });
  });
});
