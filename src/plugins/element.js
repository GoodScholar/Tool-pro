import Vue from 'vue'
import Preview from '@/components/ImagePreview/index.js'

// 导入按钮组件、表单组件、输入框组件、弹框提示组件message
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step,
  CheckboxGroup,
  Checkbox,
  Upload,
  Timeline,
  TimelineItem,
  Popover,
  Collapse,
  CollapseItem,
  Empty,
  MenuItemGroup,
  Progress,
  InputNumber,
  DatePicker,
  Radio,
  ButtonGroup,
  TimePicker,
  Rate
  // DateTimePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Popover)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Empty)
Vue.use(MenuItemGroup)
Vue.use(Progress)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(ButtonGroup)
Vue.use(TimePicker)
Vue.use(Rate)
// Vue.use(DateTimePicker)

// 图片预览组件
Vue.use(Preview)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
