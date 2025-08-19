const Input = ({ value, onChange, placeholder, onSubmit }) => {
    return (
        <textarea
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input-field px-4 py-2 bg-[#222] text-white rounded-[24px] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full"
            style={{ backdropFilter: "blur(24px)", backgroundColor: "rgba(45,45,45,.4)", borderBottom: "1px solid rgba(255, 255, 255, 0.16)" }}
            onKeyDown={onSubmit}
        />
    );
}
export default Input;