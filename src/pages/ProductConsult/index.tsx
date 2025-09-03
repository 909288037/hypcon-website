import Header from '@/components/Header';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import './index.less';
import rightArrowImg from '@/assets/images/right-arrow.png';
import { useState } from 'react';
import modalImg from '@/assets/images/success.png';

// 省份options
const provinceOptions = [
  {
    label: '上海市',
    value: '上海市',
  },
  {
    label: '江苏省',
    value: '江苏省',
  },
  {
    label: '浙江省',
    value: '浙江省',
  },
  {
    label: '安徽省',
    value: '安徽省',
  },
 
]
const ProductConsult = () => {
    const [modalVisible, setModalVisible] = useState(true);
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
          >
            <Row gutter={[80, 51]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <div>
                      公司名称<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  name="公司名称"
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
                  name="所在地区"
                  rules={[{ required: true, message: '请选择所在地区' }]}
                  layout="vertical"
                >
                  <Select placeholder="请选择您的所在地" options={provinceOptions}/>
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
                  name={'您的姓名'}
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
                  name="联系电话"
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
                <Form.Item label={'邮箱地址'} layout="vertical">
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
                  name={'咨询内容'}
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
                <Form.Item label={<div>应用场景</div>} layout="vertical">
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
          内通过您预留的电话联系您 <br />
          问题，会通过您留的联系方式同步处理进展。
          感谢您的信任，我们会尽快为您解答～
        </div>
        <div className='custom-modal_footer'>
          <Button className='custom-modal-btn' onClick={() => setModalVisible(false)}>
            已收到
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductConsult;
