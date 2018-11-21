import React from "react";

const FolderInput = props => {
  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Enter Full Folder Path</h5>
            {props.error && (
              <h5 className="text-center text-danger display-5">
                {props.error.message}
              </h5>
            )}
            <form className="form-signin" onSubmit={props.handleSubmit}>
              <div className="form-label-group">
                <input
                  id="inputFolder"
                  type="text"
                  className="form-control"
                  name="folderPath"
                  onChange={props.onChangeInput}
                  value={props.folderPath}
                  placeholder="Folder Path"
                  required
                  autoFocus
                />
                <label htmlFor="inputFolder">Folder Path</label>
              </div>

              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Start Monitoring
              </button>
              <button
                className="btn btn-lg btn-danger btn-block text-uppercase"
                type="button"
                onClick={props.stopWatching}
              >
                Stop Monitoring
              </button>
              <button
                className="btn btn-lg btn-info btn-block text-uppercase"
                type="button"
                onClick={props.handleLogout}
              >Log out</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderInput;
