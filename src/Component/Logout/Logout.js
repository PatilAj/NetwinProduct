import "./logout.css";
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { useAuth } from "../AuthProvider/AuthProvider";


const Logout = () => {
  const auth = useAuth();

  return (
    
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{fontSize:"1.2rem"}}
        >
          Profile
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {auth.user && (
            <>
              <li className="dpinfo">
                <div className="profile_img">
                  <span className="dropmenu-icon">
                    {auth.user.image && <img className="profile-picture" src={auth.user.image} alt=".loading" />}
                  </span>
                  <div className="edit">
                  </div>
                </div>
              </li>
              <li className="userinfo">
                <EmojiPeopleIcon className='icons'
                />
                {auth.user.firstName} {auth.user.lastName}
              </li>
              <li className="userinfo">
                <MarkunreadIcon className='icons'
                />
                {auth.user.email}
              </li>
            </>
          )}
          <button onClick={() => auth.logOut()} className="logoutbtn">
          <LogoutIcon className='icons'
            />Logout
        </button>
        </ul>
      </div>
    </>
  );
};

export default Logout;

