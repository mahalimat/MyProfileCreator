import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProfileCreds extends Component {
  renderDesc = exp => {
    const splittedLine = exp.description.split(";").map((line, key) => {
      return (
        <div>
          {line}
          <br />
        </div>
      );
    });

    return splittedLine;
  };

  render() {
    const { experience, education, user, auth } = this.props;

    console.log("props:", this.props);

    const expItems = experience.reverse().map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <div>
          {moment(exp.from, "YYYY-MM-DD").format("YYYY/MM/DD")} -
          {exp.to === null
            ? " Now"
            : moment(exp.to, "YYYY-MM-DD").format("YYYY/MM/DD")}
        </div>
        <div>
          <strong>Position:</strong> {exp.title}
        </div>
        <div>
          {exp.location === "" ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </div>
        <div>
          <strong>Experience:</strong>

          {exp.description === "" ? null : this.renderDesc(exp)}
        </div>
        <p>
          <strong>Environmet: </strong>
          {exp.environmet === "" ? null : (
            <span>
              <strong>{exp.environment} </strong>
            </span>
          )}
        </p>

        {user._id === auth.user.id ? (
          <div className="btn-group mb-4" role="group">
            <Link to={`/edit-experience/${exp._id}`} className="btn btn-info">
              Edit Experience
            </Link>
          </div>
        ) : null}
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
        {user._id === auth.user.id ? (
          <div className="btn-group mb-4" role="group">
            <Link to={`/edit-education/${edu._id}`} className="btn btn-info">
              Edit Education
            </Link>
          </div>
        ) : null}
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-8">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-4">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileCreds);
