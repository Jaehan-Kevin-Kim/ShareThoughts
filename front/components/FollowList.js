import { Card, List, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { css } from "@emotion/css";

const FollowList = ({ header, data }) => (
  <List
    style={{ marginBottom: 20 }}
    grid={{ column: 4, gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
    loadMore={
      <div
        className={css`
          text-align: center;
          margin: 10px 0;
        `}>
        <Button>More...</Button>
      </div>
    }
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        className={css`
          margin-top: 20px;
        `}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
