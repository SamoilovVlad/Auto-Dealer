import './Button.css';

const Button = ({ children, onClick }) => {
    return (
        <div className='cart-btn button' onClick={onClick}>{children}</div>
    );
}

export default Button;