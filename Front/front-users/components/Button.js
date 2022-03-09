const Button = ({children, onClick}) => {

    return(
        <>
            <button onClick={onClick} className="bg-blue-600 hover:bg-blue-700 border-none cursor-pointer rounded-md w-28 h-9 text-white">
                {children}
            </button>
        </>
    )

}

export default Button;