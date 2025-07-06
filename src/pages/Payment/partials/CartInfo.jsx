const CartInfo = ({ items, total, onOpen }) => {
  return (
    <div className="bg-white text-black mt-11 p-4 rounded-lg shadow-lg ">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
        <h3 className="font-bold">Thông tin đặt vé</h3>
      </div>
      <table className="w-full text-sm mb-4 font-semibold">
        <thead>
          <tr>
            <th className="text-left ">Vé</th>
            <th className="text-center">Số lượng</th>
            <th className="text-right">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className=" border-b border-gray-400">
              <td className="text-left text-primary font-semibold pt-4 pb-2">
                {item.ticket_type}
              </td>
              <td className="text-center  pt-4 pb-2 ">{item.quantity}</td>
              <td className="text-right pt-4 pb-2 ">
                {item.total?.toLocaleString()} đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center font-bold  pt-2">
        <span>Tổng tiền</span>
        <span className="text-primary">{total.toLocaleString()} đ</span>
      </div>
      <button
        className="bg-primary cursor-pointer text-white w-full py-2 rounded-lg font-bold"
        onClick={onOpen}
      >
        Thanh toán
      </button>
    </div>
  );
};
export default CartInfo;
