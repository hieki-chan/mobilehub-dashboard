import { X } from "lucide-react";
import { Input, Textarea } from "../../common_components/FormInput";

const ProductInfoTab = ({ newProduct, setNewProduct, mode }) => {
  const isEditMode = !!newProduct?.id;
  const isView = mode === "view";
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-1">
          📄 Thông tin sản phẩm
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {isEditMode && (
            <div className="col-span-2">
              <label className="text-sm font-medium text-orange-400 block mb-1">
                Mã sản phẩm
              </label>
              <input
                type="text"
                readOnly
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-orange-400 cursor-not-allowed border border-gray-700"
                value={newProduct.id}
              />
            </div>
          )}

          {/* Row 1: Name + Status */}
          <Input
            label="Tên sản phẩm"
            keyName="name"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Trạng thái
            </label>
            <select
              value={newProduct.status || "ACTIVE"}
              disabled={isView}
              onChange={(e) => {
                if (isView) return;
                setNewProduct((prev) => ({ ...prev, status: e.target.value }));
              }}
              className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ACTIVE">Hoạt động</option>
              <option value="INACTIVE">Ngừng</option>
            </select>
          </div>

          {/* Row 2: Brand + Release date */}
          <Input
            label="Thương hiệu"
            keyName="spec.brand"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />

          <Input
            label="Ngày phát hành"
            keyName="spec.release_date"
            type="date"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />

          {/* Description full width */}
          <Textarea
            label="Mô tả"
            keyName="description"
            rows={3}
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
            className="col-span-2"
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-1">
          ⚙️ Thông số kỹ thuật
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Hệ điều hành"
            keyName="spec.os"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
          <Input
            label="Bộ xử lý (CPU)"
            keyName="spec.cpu"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
          <Input
            label="Tốc độ CPU (GHz)"
            keyName="spec.cpu_speed"
            type="number"
            min={0}
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />

          <Input
            label="Đồ họa (GPU)"
            keyName="spec.gpu"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-1">
          📷 Camera & Hiển thị
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Camera sau"
            keyName="spec.rear_cam"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
          <Input
            label="Camera trước"
            keyName="spec.front_cam"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
          <Input
            label="Độ phân giải màn hình"
            keyName="spec.screen_res"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />

          <Input
            label="Dung lượng pin (mAh)"
            keyName="spec.battery_cap"
            type="number"
            min={0}
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-1">
          📱 Thông số vật lý
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Chất liệu khung máy"
            keyName="spec.material"
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />

          <Input
            label="Kích thước & khối lượng (kg)"
            keyName="spec.size_weight"
            type="number"
            min={0}
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
          <Textarea
            label="Tính năng nổi bật"
            keyName="spec.features"
            rows={2}
            newProduct={newProduct}
            setNewProduct={isView ? () => {} : setNewProduct}
            disabled={isView}
          />
        </div>
      </section>
    </div>
  );
};

export default ProductInfoTab;
