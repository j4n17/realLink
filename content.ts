interface LinkReplacementStrategy {
  apply(anchor: HTMLAnchorElement): void;
}

// 处理 zhihu.com 和 csdn.net 的替换规则：将符合 target 参数的链接进行替换
class TargetHrefStrategy implements LinkReplacementStrategy {
  apply(anchor: HTMLAnchorElement): void {
    const match = anchor.href.match(/https:\/\/link\.[^\/]+\/\?target=(.+)/);
    if (match) {
      // 解码目标链接并将其替换为 href
      const realHref = decodeURIComponent(match[1]);
      anchor.href = realHref;
    }
  }
}

// 默认策略：不进行任何操作
class DefaultStrategy implements LinkReplacementStrategy {
  apply(anchor: HTMLAnchorElement): void {
    // 不做任何替换操作
  }
}

// 策略上下文，用于根据不同域名执行不同的替换策略
class LinkReplacementContext {
  private strategy: LinkReplacementStrategy;

  constructor(strategy: LinkReplacementStrategy) {
    this.strategy = strategy;
  }

  applyStrategy(anchor: HTMLAnchorElement): void {
    this.strategy.apply(anchor);
  }
}

// 获取当前页面的策略
function getStrategy(): LinkReplacementStrategy {
  const hostname = location.hostname;
  if (
    hostname.endsWith("juejin.cn") ||
    hostname.endsWith("zhihu.com") ||
    hostname.endsWith("csdn.net") ||
    hostname.endsWith("jianshu.leichenlong.com")
  ) {
    return new TargetHrefStrategy();
  } else {
    return new DefaultStrategy();
  }
}

// 应用策略到所有 <a> 标签
function applyLinkReplacement(): void {
  const anchors = document.querySelectorAll<HTMLAnchorElement>("a");
  const strategy = getStrategy();
  const context = new LinkReplacementContext(strategy);

  anchors.forEach((anchor) => {
    context.applyStrategy(anchor);
  });
}

const observer = new MutationObserver(() => {
  applyLinkReplacement();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// 初始调用
applyLinkReplacement();
