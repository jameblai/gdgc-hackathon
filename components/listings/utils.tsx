import type { ListingWithUserAndPhotos } from "@/lib/db/types";

const categoryLabels: Record<ListingWithUserAndPhotos["category"], string> = {
  medical: "Medical",
  food: "Food",
  apparel: "Apparel",
  electronics: "Electronics",
  entertainment: "Entertainment",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export { categoryLabels, getInitials };
