import { useState } from "react";
import { Link } from "react-router-dom";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";

function HamberMenu({ isOpen, categories = [], products = [], onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory((previous) =>
      previous === category ? null : category,
    );
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-x-0 bottom-0 top-16 z-9997 bg-black/30 md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed bottom-0 left-0 top-16 z-9998 flex w-[min(320px,90vw)] flex-col overflow-hidden bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden sm:w-90 ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4">
          <h2 className="text-lg font-bold text-gray-800">Menu</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <MdClose size={26} />
          </button>
        </div>

        {/* Scrollable Content */}
        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-:none [&::-webkit-scrollbar]:hidden">
          <Link
            to="/"
            onClick={onClose}
            className="block rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>

          {categories.map((category) => {
            const isCategoryOpen = selectedCategory === category;

            const categoryProducts = products.filter(
              (product) => product.category === category,
            );

            return (
              <div
                key={category}
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  type="button"
                  aria-expanded={isCategoryOpen}
                  onClick={() => handleCategoryClick(category)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium capitalize text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  <span className="min-w-0 wrap-break-words">{category}</span>

                  <MdKeyboardArrowDown
                    size={22}
                    className={`shrink-0 transition-transform ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="mb-2 ml-3 border-l-2 border-blue-100 pl-3">
                    {categoryProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex min-w-0 items-center gap-3 border-b border-gray-50 px-2 py-3 last:border-0"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-10 w-10 shrink-0 object-contain"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 wrap-break-words text-sm text-gray-700">
                            {product.title}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-blue-600">
                            ${Number(product.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}

                    {categoryProducts.length === 0 && (
                      <p className="px-3 py-3 text-sm text-gray-500">
                        No products found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default HamberMenu;
