import { Link } from 'react-router-dom';

const DelayedLink = ({ delay, replace, state, to, ...props }) => {
  const navigate = useNavigate();
  const timerRef = useRef();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const clickHandler = (e) => {
    e.preventDefault();
    timerRef.current = setTimeout(navigate, delay, to, { replace, state });
  };

  return <Link to={to} {...props} onClick={clickHandler} />;
};