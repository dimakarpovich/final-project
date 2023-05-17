import { Link } from 'react-router-dom';
import error from '../../resources/img/ironman.png';


const Page404 = () => {
    return ( 
        <div>
            <h1 style = {{textAlign: 'center', fontSize: '51px', color: '#9f0013'}}>404</h1>
            <Link style = {{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: '#9f0013'}} to ='/'>Back to home</Link>
            <img style={{display: 'block', width: "50%", height: "100vh", margin: "0 auto"}} src={ error } alt="error" />
        </div>
     );
}
 
export default Page404;