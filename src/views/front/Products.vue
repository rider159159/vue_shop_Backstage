<template>
  <div
    :class="showTotal ? 'total-introduce' : 'detailed-introduce'"
    style="width: 60%; margin-left: 20%; margin-top: 20px"
  >
    <div class="intro-content" :title="introduce" ref="desc">
      <span class="merchant-desc" v-if="introduce">
        <div v-html="introduce"></div>
      </span>
      <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
        <p>{{ exchangeButton ? "展开" : "收起" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      introduce: "",
      showTotal: true,
      exchangeButton: true,
      showExchangeButton: false,
      rem: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    showTotalIntro() {
      this.showTotal = !this.showTotal;
      this.exchangeButton = !this.exchangeButton;
    },
    getRem() {
      const defaultRem = 16;
      let winWidth = window.innerWidth;
      let rem = (winWidth / 375) * defaultRem;
      return rem;
    },
    init() {
      this.introduce =
        "本院认为，本案的争议焦点为：第一，贾玉英的起诉是否超过了法定的起诉期限。第二，市中区房管局于2001年作出的房屋变更登记行为是否合法。第三，原一、二审判决的判决方式是否正确。\n一、关于贾玉英的起诉是否超过法定的起诉期限问题。\n本案中，市中区房管局曾就本案争议房屋作出过两次直管公房使用权转让登记审批的具体行政行为，即2001年1月21日将涉案房屋的承租人由贾玉英变更为贾涛、2003年5月14日将承租人由贾涛变更为贾玉英的行政行为。由于市中区房管局2001年1月21日作出被诉具体行政行为时，贾玉英并未到场办理承租人变更登记手续，市中区房管局和贾涛均未能提供证据证实贾玉英知道或者应当知道该变更登记行为内容的具体时间，故不能认定贾玉英于2001年1月21日就知道该具体行政行为存在。市中区房管局于2003年5月14日依据贾玉英的申请，将涉案房屋的承租人由贾涛变更为贾玉英，可以推定贾玉英于2003年5月14日知道了2001年1月21日作出的变更登记行为。\n根据《若干问题的解释》第四十一条、第四十三条的规定，公民、法人或者其他组织不知道行政机关作出的具体行政行为内容的，其起诉期限从知道或者应当知道该具体行政行为内容之日起计算，但从知道或者应当知道具体行政行为内容之日起最长不得超过2年；由于不属于起诉人自身的原因超过起诉期限的，被耽误的时间不计算在起诉期间内。《若干问题的解释》第四十三条规定的“不属于起诉人自身的原因”，是指如果起诉期限被耽误不能归结于起诉人自身原因，就不能让起诉人承担不利的法律后果，应当尽可能的对起诉人起诉予以受理或尽可能的提供救济机会。基于行政法上的信赖原则，由于2001年的变更登记行为已被市中区房管局2003年的登记行为予以变更，贾玉英当时没有必要对2001年的变更登记行为提起诉讼。此时贾玉英没有行使诉权的原因系因市中区房管局的第二次变更登记行为造成，不属于贾玉英自身的原因超过起诉期限的情况，被耽误的时间不应计算在起诉期限之内。在2003年的变更登记行为因贾涛的起诉被济南市市中区人民法院一审判决撤销后，贾玉英即提起了本案之诉，没有超过法定的起诉期限。\n二、关于市中区房管局于2001年作出的房屋变更登记行为是否合法的问题。\n贾涛主张2001年的变更登记经过贾玉英同意，但并未提供有效证据予以证明。在一审庭审及本院听证过程中，贾涛均自认2001年进行变更登记行为时，提交的申请书及转让协议中的“贾玉英”签名均非贾玉英本人所签。贾涛主张贾玉英认可2001年的房屋变更登记行为，并且委托杨长富代为协助办理变更登记，但没有提供相应证据予以证明，该主张不能成立。根据当时有效的《置换管理办法》第十条第二项的规定，转让直管公房使用权按下列程序进行：凡允许转让的，转让人与受让人应分别持申请书、直管公房租赁证、租赁契约、户籍证明和身份证明等填写《济南市直管公房使用权转让审批表》。市中区房管局在贾涛办理承租人变更登记手续时，在原承租人贾玉英未到场的情况下，既未核实申请材料中的签名是否贾玉英本人所签，又未核实转让房产是否其真实意思表示，即作出变更登记行为，未尽到审慎的审查职责。市中区房管局2001年对涉案房屋所作的变更登记行为主要证据不足，违反法定程序，依法应予撤销。\n三、关于原一、二审判决的裁判方式是否正确的问题。\n原一、二审判决均采用了确认违法的判决方式。根据《若干问题的解释》第五十七条第二款第二项的规定，被诉具体行政行为违法，但不具有可撤销内容的，可以作出确认被诉具体行政行为违法或者无效的判决。济南市市中区人民法院一审中认定“由于被告已于2003年5月14日将上述房屋的承租人由贾涛变更登记为贾玉英，故被告于2001年1月21日作出的变更登记行为已不具有可撤销内容。”但济南市市中区人民法院已于2009年6月26日作出（2009）市行初字第42号行政判决，撤销了市中区房管局2003年的房屋变更登记行为，此时生效的行政行为为2001年的房屋变更登记行为。该院认为2001年的变更登记行为不具有可撤销的内容，显属认定事实不清，适用法律错误。\n2009年10月20日，济南市中级人民法院作出（2009）济行终字第142号行政判决，维持了济南市市中区人民法院（2009）市行初字第42号行政判决。本案二审在济南市中级人民法院（2009）济行终字第142号行政判决作出之后，该院仍以与一审同样的理由作出了确认判决，亦属认定事实不清，适用法律错误。\n综上，原一、二审、再审法院的裁判确有错误，被诉具体行政行为主要证据不足、违反法定程序，依据《中华人民共和国行政诉讼法》第五十四条第二项、《最高人民法院关于执行﹤中华人民共和国行政诉讼法﹥若干问题的解释》第七十八条之规定，";
    },
  },
  watch: {
    introduce() {
      this.$nextTick(
        function () {
          let rem = parseFloat(this.getRem());
          if (!this.$refs.desc) {
            return;
          }
          let descHeight = window
            .getComputedStyle(this.$refs.desc)
            .height.replace("px", "");
          if (descHeight > 1.25 * rem) {
            this.showExchangeButton = true;
            this.exchangeButton = true;
            this.showTotal = false;
          } else {
            this.showExchangeButton = false;
            this.showTotal = true;
          }
        }.bind(this)
      );
    },
  },
};
</script>

<style lang="scss" scoped rel="stylesheet/less">
.total-introduce {
  height: auto;
  overflow: hidden;
  font-size: 14px;
  color: #434343;
  margin: 10px;
  .intro-content {
    .merchant-desc {
      width: 100%;
      line-height: 21px;
    }
  }
  .unfold {
    display: block;
    z-index: 11;
    float: right;
    width: 40px;
    height: 21px;
    p {
      margin: 0;
      line-height: 21px;
      color: #7fbe87;
    }
  }
}
.detailed-introduce {
  font-size: 14px;
  color: #434343;
  position: relative;
  overflow: hidden;
  margin: 10px;
  .intro-content {
    // 最大高度设为4倍的行间距
    max-height: 84px;
    line-height: 21px;
    word-wrap: break-word;
    /*强制打散字符*/
    word-break: break-all;
    background: #ffffff;
    /*同背景色*/
    color: #ffffff;
    overflow: hidden;
    .merchant-desc {
      width: 100%;
      line-height: 21px;
    }
    &:after,
        // 这是展开前实际显示的内容
      &:before {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      color: #434343;
      // overflow: hidden;
    }
    // 把最后最后一行自身的上面三行遮住
    &:before {
      display: block;
      overflow: hidden;
      z-index: 1;
      max-height: 63px;
      background: #ffffff;
    }
    &:after {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 81px;
      /*截取行数*/
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
      text-indent: -12em;
      /*尾部留空字符数*/
      padding-right: 4em;
    }
    .unfold {
      z-index: 11;
      width: 40px;
      height: 21px;
      outline: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      p {
        margin: 0;
        line-height: 21px;
        color: #7fbe87;
      }
    }
  }
}
</style>
