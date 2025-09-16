import pdfImg from '@/assets/images/file/pdf.png';
import docImg from '@/assets/images/file/doc.png';
import jpgImg from '@/assets/images/file/jpg.png';
import pptImg from '@/assets/images/file/ppt.png';
import xlsImg from '@/assets/images/file/xls.png';
import dwgImg from '@/assets/images/file/dwg.png';
import pngImg from '@/assets/images/file/png.png';
import txtImg from '@/assets/images/file/txt.png';
import pdfActiveImg from '@/assets/images/file/pdf-active.png';
import docActiveImg from '@/assets/images/file/doc-active.png';
import jpgActiveImg from '@/assets/images/file/jpg-active.png';
import pptActiveImg from '@/assets/images/file/ppt-active.png';
import xlsActiveImg from '@/assets/images/file/xls-active.png';
import dwgActiveImg from '@/assets/images/file/dwg-active.png';
import pngActiveImg from '@/assets/images/file/png-active.png';
import txtActiveImg from '@/assets/images/file/txt-active.png';
// 产品中心列表
export const productList = [
  {
    title: '楼宇自控',
    url: '/zhcs',
  },
  {
    title: '工业自动化',
    url: '/zhsq',
  },
  {
    title: '工业互联网',
    url: '/zhjy',
  },
];

// 解决方案列表
export const solutionList = [
  {
    title: '智慧枢纽',
    url: '/zhyq',
  },
  {
    title: '轨道交通',
    url: '/zhsw',
  },
  {
    title: '智慧水务',
    url: '/zhgdjt',
  },
  {
    title: '政府公建',
    url: '/zhsjzx',
  },
  {
    title: '智慧医院',
    url: '/zhny',
  },
  {
    title: '智慧园区',
    url: '/zhlw',
  },
  {
    title: '智慧场馆',
    url: '/zhsjzx',
  },
  {
    title: '电子厂房',
    url: '/zhsh',
  },
];

// 服务支持
export const supportList = [
  {
    title: '服务保障',
    url: '/service-network',
  },
  {
    title: '资料下载',
    url: '/download',
  },
 
];

// x新闻资讯
export const newsList = [
  {
    title: '新闻动态',
    url: '/news',
  },
]

// 关于我们
export const aboutList = [
  {
    title: '企业简介',
    url: '/introduction',
  },
  {
    title: '联系我们',
    url: '/contact',
  },
  {
    title: '加入我们',
    url: '/join',
  },
]


export const fileTypeImg = {
  'jpg': {
    default: jpgImg,
    hover: jpgActiveImg
  },
  'jpeg': {
    default: jpgImg,
    hover: jpgActiveImg
  },
  'pdf': {
    default: pdfImg,
    hover: pdfActiveImg
  },
  'doc': {
    default: docImg,
    hover: docActiveImg
  },
  'docx': {
    default: docImg,
    hover: docActiveImg
  },
  'xls': {
    default: xlsImg,
    hover: xlsActiveImg
  },
  'xlsx': {
    default: xlsImg,
    hover: xlsActiveImg
  },
  'ppt': {
    default: pptImg,
    hover: pptActiveImg
  },
  'pptx': {
    default: pptImg,
    hover: pptActiveImg
  },
  'txt': {
    default: txtImg,
    hover: txtActiveImg
  },
  'png': {
    default: pngImg,
    hover: pngActiveImg
  }, 
 'dwg': {
    default: dwgImg,
    hover: dwgActiveImg
 }
}