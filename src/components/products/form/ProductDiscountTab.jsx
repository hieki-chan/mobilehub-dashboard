import { useEffect } from "react";
import { Input, Textarea } from "../../common_components/FormInput";

// special: validation function for product discount tab
export const validateProductDiscount = (product) => {
  const errors = {};

  if (
    !product.price ||
    !product.discount?.valueInPercent ||
    !product.discount?.startDate ||
    !product.discount?.endDate ||
    !product.spec?.release_date
  ) {
    errors.required = "Vui lòng không để trống bất kỳ trường nào.";
  }

  const percent = parseFloat(product.discount?.valueInPercent);
  if (percent < 0 || percent > 100) {
    errors.percent = "Phần trăm giảm phải từ 0 đến 100.";
  }

  const now = new Date();
  const start = new Date(product.discount?.startDate);
  if (start < now) {
    errors.startDate = "Ngày bắt đầu không được trong quá khứ.";
  }

  const end = new Date(product.discount?.endDate);
  if (end < start) {
    errors.endDate = "Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.";
  }

  const release = new Date(product.spec?.release_date);
  if (release > now) {
    errors.releaseDate = "Ngày phát hành phải là hiện tại hoặc quá khứ.";
  }

  return errors;
};

const ProductDiscountTab = ({ newProduct, setNewProduct, mode }) => {
  const isView = mode === "view";
  // ✅ Tự động tính giá sau khi giảm khi giá hoặc % thay đổi
  useEffect(() => {
    if (isView) return;

    const price = parseFloat(newProduct.price) || 0;
    const discountPercent =
      parseFloat(newProduct.discount?.valueInPercent) || 0;
    const discountedPrice = price - (price * discountPercent) / 100;

    setNewProduct((prev) => ({
      ...prev,
      discountPrice: discountedPrice > 0 ? Math.round(discountedPrice) : 0,
    }));
  }, [newProduct.price, newProduct.discount?.valueInPercent, isView]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold border-b border-gray-700 pb-1">
        💰 Giá & khuyến mãi
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Phần trăm giảm (%)"
          keyName="discount.valueInPercent"
          type="number"
          min={0}
          max={100}
          newProduct={newProduct}
          setNewProduct={isView ? () => {} : setNewProduct} // ✅ SỬA
          disabled={isView} // ✅ THÊM
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Ngày bắt đầu"
          keyName="discount.startDate"
          type="datetime-local"
          newProduct={newProduct}
          setNewProduct={isView ? () => {} : setNewProduct} // ✅ SỬA
          disabled={isView} // ✅ THÊM
        />
        <Input
          label="Ngày kết thúc"
          keyName="discount.endDate"
          type="datetime-local"
          newProduct={newProduct}
          setNewProduct={isView ? () => {} : setNewProduct} // ✅ SỬA
          disabled={isView} // ✅ THÊM
        />
      </div>
    </div>
  );
};

export default ProductDiscountTab;
