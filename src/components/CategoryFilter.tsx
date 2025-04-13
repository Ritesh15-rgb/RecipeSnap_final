'use client';

type Category = 'All' | 'Vegetable' | 'Rice' | 'Fruit' | 'Breakfast' | 'Seafood' | 'Fast Food' | 'Dessert' | 'Beverages';

interface CategoryFilterProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const CategoryFilter = ({ activeCategory, setActiveCategory }: CategoryFilterProps) => {
  const categories: Category[] = ['Vegetable', 'Rice', 'Fruit'];

  return (
    <div className="flex overflow-x-auto mb-4">
      {categories.map(category => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full font-semibold text-sm mr-2
            ${activeCategory === category ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

