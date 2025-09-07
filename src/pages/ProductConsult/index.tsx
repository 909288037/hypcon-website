import rightArrowImg from '@/assets/images/right-arrow.png';
import modalImg from '@/assets/images/success.png';
import Header from '@/components/Header';
import { submitProductConsult } from '@/services/ServiceNetwork';
import { useRequest } from '@umijs/max';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useState } from 'react';
import './index.less';

// 省份options
const provinceOptions = [
  {
    label: '安徽省',
    value: '安徽省',
  },
  {
    label: '北京市',
    value: '北京市',
  },
  {
    label: '重庆市',
    value: '重庆市',
  },
  {
    label: '福建省',
    value: '福建省',
  },
  {
    label: '甘肃省',
    value: '甘肃省',
  },
  {
    label: '广东省',
    value: '广东省',
  },
  {
    label: '广西壮族自治区',
    value: '广西壮族自治区',
  },
  {
    label: '贵州省',
    value: '贵州省',
  },
  {
    label: '海南省',
    value: '海南省',
  },
  {
    label: '河北省',
    value: '河北省',
  },
  {
    label: '黑龙江省',
    value: '黑龙江省',
  },
  {
    label: '河南省',
    value: '河南省',
  },
  {
    label: '湖北省',
    value: '湖北省',
  },
  {
    label: '湖南省',
    value: '湖南省',
  },
  {
    label: '江苏省',
    value: '江苏省',
  },
  {
    label: '江西省',
    value: '江西省',
  },
  {
    label: '吉林省',
    value: '吉林省',
  },
  {
    label: '辽宁省',
    value: '辽宁省',
  },
  {
    label: '内蒙古自治区',
    value: '内蒙古自治区',
  },
  {
    label: '澳门特别行政区',
    value: '澳门特别行政区',
  },
  {
    label: '宁夏回族自治区',
    value: '宁夏回族自治区',
  },
  {
    label: '青海省',
    value: '青海省',
  },
  {
    label: '上海市',
    value: '上海市',
  },
  {
    label: '山西省',
    value: '山西省',
  },
  {
    label: '陕西省',
    value: '陕西省',
  },
  {
    label: '山东省',
    value: '山东省',
  },
  {
    label: '四川省',
    value: '四川省',
  },
  {
    label: '天津市',
    value: '天津市',
  },
  {
    label: '台湾省',
    value: '台湾省',
  },
  {
    label: '香港特别行政区',
    value: '香港特别行政区',
  },
  {
    label: '新疆维吾尔自治区',
    value: '新疆维吾尔自治区',
  },
  {
    label: '西藏自治区',
    value: '西藏自治区',
  },
  {
    label: '云南省',
    value: '云南省',
  },
  {
    label: '浙江省',
    value: '浙江省',
  },
];
const ProductConsult = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { run } = useRequest(submitProductConsult, {});
  const [form] = Form.useForm();
  return (
    <div className="product-consult">
      <Header theme="light" className="product-consult-header" />
      <div className="product-consult-content">
        <div className="product-consult-content-title">
          <div className="gradient-text">产品咨询</div>
          <div className="product-consult-content-title-desc">
            感谢关注泛联智控，请留下您的联系方式，
            <br />
            无论您想了解产品功能、适配场景还是定制方案，我们随时为您解答
          </div>
        </div>
        <div className="product-consult-content-form">
          <Form
            form={form}
            requiredMark={false}
            scrollToFirstError={{
              behavior: 'instant',
              block: 'end',
              focus: true,
            }}
            size="large"
            onFinish={(values) => {
              run(values).then(() => {
                form.resetFields();
                setModalVisible(true);
              });
            }}
          >
            <Row gutter={[80, 51]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <div>
                      公司名称<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  name="title"
                  rules={[{ required: true, message: '请输入公司名称' }]}
                  layout="vertical"
                >
                  <Input placeholder="请输入公司名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <div>
                      所在地区<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  name="second"
                  rules={[{ required: true, message: '请选择所在地区' }]}
                  layout="vertical"
                >
                  <Select
                    placeholder="请选择您的所在地"
                    options={provinceOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[80, 51]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <div>
                      您的姓名<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  name={'third'}
                  rules={[{ required: true, message: '请输入您的姓名' }]}
                  layout="vertical"
                >
                  <Input placeholder="请输入您的姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <div>
                      联系电话<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  name="fourth"
                  rules={[
                    {
                      required: true,
                      validator(rule, value) {
                        if (!value) {
                          return Promise.reject(new Error('请输入联系电话'));
                        } else if (
                          !/^(?:(?:\+|00)86)?1\d{10}$/.test(value) &&
                          !/^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(
                            value,
                          )
                        ) {
                          return Promise.reject(
                            new Error('请输入正确的联系电话'),
                          );
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                  layout="vertical"
                >
                  <Input placeholder="请输入联系电话" type="tel" />
                </Form.Item>
              </Col>
            </Row>
            {/* 邮箱地址 */}
            <Row gutter={[80, 51]}>
              <Col span={12}>
                <Form.Item label={'邮箱地址'} name="fifth" layout="vertical">
                  <Input placeholder="请输入邮箱地址" type="email" />
                </Form.Item>
              </Col>
            </Row>
            {/* 咨询内容 */}
            <Row gutter={[80, 51]}>
              <Col span={24}>
                <Form.Item
                  label={
                    <div>
                      咨询内容<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  rules={[{ required: true, message: '请输入咨询内容' }]}
                  name={'sixth'}
                  layout="vertical"
                >
                  <Input.TextArea
                    placeholder="请详细描述您想咨询的内容（例如：FCS100系列产品报价咨询/需要了解HypView行业定制方案，想了解部署周期和预算）"
                    autoSize={{
                      minRows: 4,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* 应用场景 */}
            <Row gutter={[80, 51]}>
              <Col span={24}>
                <Form.Item
                  label={<div>应用场景</div>}
                  name={'res1'}
                  layout="vertical"
                >
                  <Input.TextArea
                    placeholder="您的需求应用在什么场景/行业？了解场景后，我们会匹配对应行业经验的顾问为您解答"
                    autoSize={{
                      minRows: 4,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* 提交按钮 */}
            <Form.Item
              className="product-consult-content-form-button"
              style={{ textAlign: 'center' }}
            >
              <Button type="primary" htmlType="submit">
                确认提交
                <img src={rightArrowImg} alt="" />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal
        footer={null}
        className="custom-modal"
        open={modalVisible}
        closable={false}
        centered
      >
        <div className="custom-modal_header">
          <img src={modalImg} alt="" />
        </div>
        <div className="custom-modal_content">
          咨询需求提交成功！
          <br />
          我们已收到您的信息，专属顾问将在 24 小时 <br />
          内通过您预留的电话联系您。 <br />
          感谢您的信任，我们会尽快为您解答～
        </div>
        <div className="custom-modal_footer">
          <Button
            className="custom-modal-btn"
            onClick={() => setModalVisible(false)}
          >
            已收到
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductConsult;
