const Button = ({ children, styles }) => {
  return (
    <button type="button" className={`${styles} cursor-pointer text-center text-white font-maven
    px-5 py-2 hover:scale-110 transition-all duration-200 ease-in-out drop-shadow-md outline-none select-none`}>
      {children}
    </button>
  )
}

export default Button