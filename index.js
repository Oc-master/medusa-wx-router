const platform = wx;

const JUMP_TYPE_DICT = {
  push: 'navigateTo',
  replace: 'redirectTo',
  reLaunch: 'reLaunch',
  switchTab: 'switchTab',
};

const DEFAULT_OPTIONS = {
  type: 'push',
  query: {},
};

/**
 * 统一错误处理函数
 * @param {String|Object} error 错误信息
 */
const _errorHandle = (error) => {
  console.error(error);
};

/**
 * 检测用户传入的字符串是否带有参数，返回统一的路由跳转函数参数数据结构
 * @param {String} url 待处理url
 */
const _formatQuery = (url) => {
  const hasQuery = url.indexOf('?') === -1;
  if (hasQuery) return { url };
  const [unprocessedUrl, queryStr] = url.split('?');
  const query = queryStr.split('&').reduce((acc, item) => {
    const [key, value] = item.split('=');
    return {
      ...acc,
      [`${key}`]: value,
    };
  }, {});
  return { url: unprocessedUrl, query };
};

/**
 * 检测目标页面路径为空判断及是否为自身
 * @param {String} url 目标页面路径
 */
const _checkUrlOfLegitimate = (url) => {
  if (!url) {
    _errorHandle('Error: 目标页面路径不能为空');
    return false;
  }
  const { route } = getCurrentPages().pop();
  if (url === route) {
    _errorHandle('Error: 请勿将当前页面地址设置为跳转的目标页面路径');
    return false;
  }
  return true;
};

/**
 * 检测路由跳转方式是否合法
 * @param {String} type 路由跳转方式
 */
const _checkTypeLegitimate = (type) => {
  if (!JUMP_TYPE_DICT[type]) {
    _errorHandle('Error: 请使用正确的跳转方式');
    return false;
  }
  return true;
};

/**
 * 编码路由跳转参数为字符串，提供参数保真功能
 * @param {Object} query 路由参数
 */
const _encoding = (query) => encodeURIComponent(JSON.stringify(query));

/**
 * 拼接原生Api所需字符串，附带switchTab参数过滤功能
 * @param {String} url 目标页面路径
 * @param {String} query 已转码的路由参数
 * @param {String} type 路由跳转方式
 */
const _mergeQuery = (url, query, type) => {
  if (type === 'switchTab') return `/${url}`;
  return `/${url}?msQuery=${_encoding(query)}`;
};

/**
 * 通用路由跳转参数，统一处理四种前进路由方法
 * @param {Object} param { url: String, query: Object, type: String success: Function } 路由跳转方法所需参数
 */
const _jump = ({ url: unprocessedUrl, query, type, success = () => { } }) => {
  const isUrlLegitimate = _checkUrlOfLegitimate(unprocessedUrl);
  if (!isUrlLegitimate) return undefined;
  const isTypeLegitimate = _checkTypeLegitimate(type);
  if (!isTypeLegitimate) return undefined;
  const url = _mergeQuery(unprocessedUrl, query, type);
  platform[JUMP_TYPE_DICT[type]]({
    url,
    success,
    fail: (err) => _errorHandle(err),
  });
};

export const routerTo = (param, ...rest) => {
  const type = Object.prototype.toString.call(param);
  if (type === '[object String]') {
    const temp = _formatQuery(param);
    const [query = {}] = rest;
    const options = {
      ...DEFAULT_OPTIONS,
      ...temp,
      query,
    };
    _jump(options);
    return undefined;
  }
  if (type === '[object Object]') {
    const options = {
      ...DEFAULT_OPTIONS,
      ...param,
    };
    _jump(options);
    return undefined;
  }
  _errorHandle('Error: 参数有误');
};

export const decoding = (options = {}) => {
  const { msQuery } = options;
  if (msQuery) return JSON.parse(decodeURIComponent(query));
  return options;
};

export const back = (delta = 1) => platform.navigateBack({ delta });

export const goHome = () => platform.navigateBack({ delta: 100 });

export default {
  routerTo,
  decoding,
  back,
  goHome,
};
