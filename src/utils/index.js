function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const dateTime = new Date(date);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();

  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('-');
  const t2 = [hour, minute, second].map(formatNumber).join(':');
  return `${t1} ${t2}`;
}

export function formatData(data) {
  // eslint-disable-next-line
  const result = data.map((item) => {
    return { ...item, create_at: formatTime(item.create_at), content: item.content.replace(/<img/gi, '<img style="max-width:100%;height:auto"') };
  });
  return result;
}

export function formatRichText(data) {
  return {
    ...data,
    create_at: formatTime(data.create_at),
    content: data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto"'),
    last_reply_at: formatTime(data.last_reply_at),
    replies: formatData(data.replies),
  };
}

export function ajax({
  url,
  method = 'GET',
  header = {
    'content-type': 'application/json', // 默认值
  },
  data,
  ...params
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      ...params,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

export function scanCode(...params) {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      ...params,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
}

export default {
  formatRichText,
  formatNumber,
  formatTime,
  formatData,
  ajax,
};
