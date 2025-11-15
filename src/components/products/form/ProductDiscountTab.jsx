import { useEffect } from "react";
import { Input, Textarea } from "../../common_components/FormInput";

const ProductDiscountTab = ({ newProduct, setNewProduct }) => {
  // ✅ Tự động tính giá sau khi giảm khi giá hoặc % thay đổi
  useEffect(() => {
    const price = parseFloat(newProduct.price) || 0;
    const discountPercent =
      parseFloat(newProduct.discount?.valueInPercent) || 0;
    const discountedPrice = price - (price * discountPercent) / 100;
    setNewProduct((prev) => ({
      ...prev,
      discountPrice: discountedPrice > 0 ? Math.round(discountedPrice) : 0,
    }));
  }, [newProduct.price, newProduct.discount?.valueInPercent]);

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
          setNewProduct={setNewProduct}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Ngày bắt đầu"
          keyName="discount.startDate"
          type="datetime-local"
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
        <Input
          label="Ngày kết thúc"
          keyName="discount.endDate"
          type="datetime-local"
          newProduct={newProduct}
          setNewProduct={setNewProduct}
        />
      </div>
    </div>
  );
};

export default ProductDiscountTab;
