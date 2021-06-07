import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Table, Tag, Space, Button, Modal, Input, Radio } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

function Ledger() {
  const { Column } = Table;
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(true);
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [data, setData] = useState([
    {
      key: "1",
      name: "เงินเดือน",
      income: 24000,
    },
    {
      key: "2",
      name: "ค่าบ้าน",
      expenses: 4000,
    },
    {
      key: "3",
      name: "ค่าโทรศัพท์",
      expenses: 4090,
    },
  ]);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].income) {
        data[i].total =
          i == 0
            ? data[i].income
            : parseInt(data[i - 1].total) + parseInt(data[i].income);
      } else if (data[i].expenses) {
        data[i].total =
          i == 0 ? data[i].expenses : data[i - 1].total - data[i].expenses;
      }
    }
  }, [data]);

  const handleDelete = (id) => {
    console.log("DETA ID ==> ", id);
  };

  const handleView = (record) => {
    console.log(record);
  };

  const handleSubmit = () => {
    let obj = { name };
    let size = data.length;
    type ? (obj.income = cost) : (obj.expenses = cost);
    obj.total = type
      ? parseInt(data[size - 1].total) + parseInt(cost)
      : data[size - 1].total - cost;
    obj.created = new Date().toLocaleDateString();
    setData([...data, obj]);
    resetData();
  };

  const resetData = () => {
    setName(undefined);
    setCost(undefined);
    setType(true);
    setShowModal(false);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">
                  รายการบัญชี
                  <Button
                    type="primary"
                    style={{ marginLeft: "20px" }}
                    onClick={() => setShowModal(!showModal)}
                  >
                    เพิ่มรายการ
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table dataSource={data} pagination={false}>
                  <Column title="วันที่" dataIndex="created" key="created" />
                  <Column title="รายการ" dataIndex="name" key="name" />
                  <Column
                    title="รายรับ (บาท)"
                    dataIndex="income"
                    key="income"
                    render={(income) =>
                      income ? (
                        <Tag color="green">
                          {parseInt(income).toLocaleString()}
                        </Tag>
                      ) : (
                        "-"
                      )
                    }
                  />
                  <Column
                    title="รายจ่าย (บาท)"
                    dataIndex="expenses"
                    key="expenses"
                    render={(expenses) =>
                      expenses ? (
                        <Tag color="red">
                          {parseInt(expenses).toLocaleString()}
                        </Tag>
                      ) : (
                        "-"
                      )
                    }
                  />
                  <Column
                    title="สรุป (บาท)"
                    dataIndex="total"
                    key="total"
                    render={(total) => <div> {total}</div>}
                  />

                  {/* <Column
                    title="แก้ไขล่าสุด"
                    key="updated"
                    render={(record) => formatDateTime(record.updated)}
                  /> */}
                  {/* <Column
                    title="เครื่องมือ"
                    key="action"
                    render={(record) => (
                      <Space size="middle">
                        <Button
                          //   shape="circle"
                          icon={<SearchOutlined />}
                          onClick={() => handleView(record)}
                        />
                        <Button
                          type="primary"
                          //   shape="circle"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(record.id)}
                        />
                      </Space>
                    )}
                  /> */}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal
          title="เพิ่มรายการ"
          visible={showModal}
          onOk={handleSubmit}
          onCancel={() => setShowModal(false)}
          zIndex={10000}
        >
          <div style={{ fontSize: "16px", marginBottom: "6px" }}>
            ชื่อรายการ
          </div>
          <Input
            placeholder="กรอกชื่อของรายการ"
            value={name}
            style={{ marginBottom: "12px" }}
            onChange={({ target: { value } }) => setName(value)}
          />

          <div style={{ fontSize: "16px", marginBottom: "6px" }}>
            จำนวน (บาท)
          </div>
          <Input
            placeholder="กรอกจำนวนของรายการ"
            style={{ marginBottom: "25px" }}
            value={cost}
            onChange={({ target: { value } }) => setCost(value)}
          />
          <Radio.Group
            onChange={({ target: { value } }) => {
              setType(value);
            }}
            value={type}
          >
            <Radio value={true}>รายรับ</Radio>
            <Radio value={false}>รายจ่าย</Radio>
          </Radio.Group>
        </Modal>
      </div>
    </>
  );
}

export default Ledger;
