const Button = ({ show=true, children, onClick, classButton, state }) => {

    const opacity = state ? 'opacity-40' : ''

    if (!show) return null;

    return (
        <button
            disabled={state}
            onClick={onClick}
            className={`${opacity} my-5 bg-blue-600 hover:bg-blue-700 border-none cursor-pointer rounded-md px-4 py-2 w-28 min-w-max h-9 text-white ${classButton}`}>
            {children}
        </button>
    )

}

export default Button;