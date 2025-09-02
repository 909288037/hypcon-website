import Header from '@/components/Header';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import './index.less';
const ProductConsult = () => {
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
                  <Select placeholder="请选择您的所在地" />
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
                    rows={4}
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
                    rows={4}
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
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductConsult;
