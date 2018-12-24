import React from "react";
import Card from '@material-ui/core/Card';

const cardStyle = {
  width: 400,
  margin: "auto",
  marginTop: 100,
  textAlign: "center"
}

function NoMatch() {
  return (
          <Card style={cardStyle}>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </Card>
  );
}

export default NoMatch;
