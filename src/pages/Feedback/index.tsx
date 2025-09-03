import rightArrowImg from '@/assets/images/right-arrow.png';
import modalImg from '@/assets/images/success.png';
import Header from '@/components/Header';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { useState } from 'react';
import './index.less';

const Feedback = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <div className="feedback">
      <Header theme="light" className="feedback-header" />
      <div className="feedback-content">
        <div className="feedback-content-title">
          <div className="gradient-text">意见反馈</div>
          <div className="feedback-content-title-desc">
            您的每一条反馈，我们都会认真记录，逐条改进，让服务更贴您的需求
          </div>
        </div>
        <div className="feedback-content-form">
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
            <Row gutter={[80, 51]}>
              <Col span={12}>
                <Form.Item label={'邮箱地址'} layout="vertical">
                  <Input placeholder="请输入邮箱地址" type="email" />
                </Form.Item>
              </Col>
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
            </Row>
            {/* 详细描述※ */}
            <Row gutter={[80, 51]}>
              <Col span={24}>
                <Form.Item
                  label={
                    <div>
                      详细描述<span style={{ color: '#FF5858' }}>※</span>
                    </div>
                  }
                  rules={[{ required: true, message: '请输入详细描述' }]}
                  name={'详细描述'}
                  layout="vertical"
                >
                  <Input.TextArea
                    placeholder={`请详细描述您的反馈，可包括： \n・具体是产品 / 服务的哪个部分（如‘HypView后台’‘设备原型’）； \n・发生了什么情况（如‘点击添加后没有反馈’‘希望优化绑点功能操作步骤’）； \n越具体的反馈，越能帮助我们改进服务~
                      `}
                    autoSize={{
                      minRows: 4,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* 提交按钮 */}
            <Form.Item
              className="feedback-content-form-button"
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
          反馈提交成功！
          <br />
          您的每一条建议/问题我们都已认真记录， <br />
          我们会在1—3个工作日内核实内容，若涉及项目具体 <br />
          问题，会通过您留的联系方式同步处理进展。
          感谢您的认真反馈，这是我们改进的重要动力！
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

export default Feedback;
