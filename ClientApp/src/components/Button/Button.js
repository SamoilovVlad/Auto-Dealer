import './Button.css';

const Button = ({children}) => {
    return (
        <div className='cart-btn button'>{children}</div>
    );
}

export default Button;