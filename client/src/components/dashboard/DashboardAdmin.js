// import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
// import DashboardActions from './DashboardActions';
// import Social from './Social';
// import { getCurrentProfile, deleteAccount } from '../../actions/profile';

// const Dashboard = ({
//   getCurrentProfile,
//   deleteAccount,
//   auth: { user },
//   profile: { profile, loading }
// }) => {
//   useEffect(() => {
//     getCurrentProfile();
//   }, [getCurrentProfile]);

//   return loading && profile === null ? (
//     <Spinner />
//   ) : (
//     <Fragment>
//       <div className='profileTitel'>Dashboard Admin</div>
//       <p className='lead'>
//         <i className='fas fa-user'></i>Welcome {user && user.First_name}
//       </p>

//       {profile !== null ? (
//         <Fragment>
//           <DashboardActions />
//           <Social social={profile.social} />

//           <div className='my-2'>
//             <button className='btn btn-danger' onClick={() => deleteAccount()}>
//               <i className='fas fa-user-minus'></i>Delete My Account
//             </button>
//           </div>
//         </Fragment>
//       ) : (
//         <Fragment>
//           <p>You have not yet setup a profile , please add some info</p>
//           <Link to='/create-profile' className='btn btn-primary my-1'>
//             {' '}
//             Create profile
//           </Link>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };
// Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });
// export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
//   Dashboard
// );

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

import { getProfiles } from '../../actions/profile';

const DashboardAdmin = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='profileTitel'> Profiles</h1>

          <div className='profilesflex'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No profile found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileItem.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(DashboardAdmin);
