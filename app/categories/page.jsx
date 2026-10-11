import { prisma } from "@/lib/db";
import { toPlain } from "@/lib/utils";
import CategoryCard from "@/components/categories/CategoryCard";
import EmptyState from "@/components/common/EmptyState";
import PageBanner from "@/components/common/PageBanner";

export const metadata = {
  title: "Categories | Agmoo",
  description: "Shop Agmoo categories — cables, chargers, earbuds, handsfree and power banks.",
};

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
  const plainCategories = toPlain(categories);

  return (
    <div>
      <PageBanner title="Shop by Category" subtitle="Cables, adapters, audio, and portable power" />
    <div className="container-app pb-10">

      {plainCategories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {plainCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🗂️" title="No categories yet" description="Please check back soon." />
      )}
    </div>
    </div>
  );
}
