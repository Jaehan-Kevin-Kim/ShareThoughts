import { StopOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import { Button, Card, List } from "antd";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFollower, unfollow } from "../features/user/userService";

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();

  //아래의 경우는 고차함수로 인자가 넘어 왔을때 function을 처리 하는 방법
  const onCancel = (id) => () => {
    if (header === "Following List") {
      dispatch(unfollow(id));
    } else {
      dispatch(removeFollower(id));
    }
  };

  return (
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
          <Button onClick={onClickMore} loading={loading}>
            More...
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className={css`
            margin-top: 20px;
          `}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
      //위 onClick={onCancel(인자)}이렇게 넘겨 줄 수 있는 것은, 현재 반복문 안에서 특정 값을 인자로 보내기 위함이다. 이걸 나중에 함수에서 받아서 쓸 때는 고차함수 형태로 해서 해당 값을 받을 수 있음.
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FollowList;
