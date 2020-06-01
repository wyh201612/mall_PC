<template>
    <div class="main-content tradersPassword">
        <div class="title margin-bottom-sm">
            <el-divider direction="vertical" class="bg-orange"></el-divider>
            <span v-if="bindPayPassword==2">设置交易密码</span>
            <span v-if="bindPayPassword==1&&memberPassword==1">忘记交易密码</span>
            <span v-if="bindPayPassword==1&&memberPassword==2">修改交易密码</span>
        </div>
        <div class="info_centent">
            <div class="info_centent_top margin-bottom-lg">
                <div class="info_centent_top_center">
                    <!-- 设置交易密码 -->
                    <div class="first" v-show="bindPayPassword==2">
                        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="设置密码" prop="password">
                                <el-input v-model="ruleForm1.password" maxlength='6' type='password' name="password" placeholder="请输入设置密码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input v-model="ruleForm1.confirmPassword" maxlength='6' type='password' name="confirmPassword" placeholder="请输入设置密码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm1')">设置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 修改交易密码 -->
                    <div class="second" v-show="bindPayPassword==1&&memberPassword==2">
                        <el-form :model="ruleForm4" :rules="rules4" ref="ruleForm4" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="原密码" prop="oldPassword">
                                <el-input v-model="ruleForm4.oldPassword" maxlength='6' type='password' name="oldPassword" placeholder="请输入设置密码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item label="设置密码" prop="payPassword">
                                <el-input v-model="ruleForm4.payPassword" maxlength='6' type='password' name="payPassword" placeholder="请输入设置密码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="newPayPassword">
                                <el-input v-model="ruleForm4.newPayPassword" maxlength='6' type='password' name="newPayPassword" placeholder="请输入设置密码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="modifyPassword('ruleForm4')">完成</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 忘记交易密码 -->
                    <div class="third" v-show="bindPayPassword==1&&memberPassword==1">
                        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="!forgetPassword">
                            <el-form-item label="手机号码" prop="mobile">
                                <el-input v-model="ruleForm2.mobile" maxlength='11' name="mobile" placeholder="请输入手机号码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" prop="code">
                                <el-input v-model="ruleForm2.code" class="inp-sm" maxlength='6' name="code" placeholder="请输入验证码" autocomplete='on'></el-input>
                                <span class="getCode" v-if="!showCode" @click="getCode">{{codeText}}</span>
                                <span class="reset-button" v-if="showCode">{{countdown}}s</span>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="nextStep('ruleForm2')">下一步</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm" v-show="forgetPassword">
                            <el-form-item label="设置密码" prop="password">
                                <el-input v-model="ruleForm3.password" maxlength='6' type='password' name="password" placeholder="请输入设置密码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPassword">
                                <el-input v-model="ruleForm3.confirmPassword" maxlength='6' type='password' name="confirmPassword" placeholder="请输入验证码" autocomplete='on'></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="setPassword('ruleForm3')">完成</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { verificationCodeCkeck, verificationCodeCreate, login } from '@/api/user'
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    import { isCellPhone } from '@/utils/validate'
    import { mapState } from 'vuex'
    export default {
        name: 'tradersPassword',
        components: {
        },
        props:{
            activityCouponMemberList:{
                type: Object
            },
            goldenBeansInfo:{
                type: Object
            },
            payOffTotal:{
                type: Number
            },
        },
        data() {
            var validatePayPassword1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else {
                    callback();
                }
            };
            var validateConfirmPassword1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else if(value!=this.ruleForm1.password){
                    callback(new Error('两次密码输入不一致'));
                } else {
                    callback();
                }
            };

            var validateLoginNames2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if(!isCellPhone(value)){
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };

            var validatePassword3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else {
                    callback();
                }
            };
            var validateConfirmPassword3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else if(value!=this.ruleForm3.password){
                    callback(new Error('两次密码输入不一致'));
                } else {
                    callback();
                }
            };
            
            var validateOldPassword4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else {
                    callback();
                }
            };
            var validatePayPassword4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else {
                    callback();
                }
            };
            var validateNewPayPassword4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if(!/^[0-9]{6,6}$/.test(value)){
                    callback(new Error('请输入6位数的数字交易密码'));
                } else if(value!=this.ruleForm4.payPassword){
                    callback(new Error('两次密码输入不一致'));
                } else {
                    callback();
                }
            };
            return {
                memberPassword: '2',
                countdown: 60,
                time1:　null,
                codeText: '获取验证码',
                showCode: false,
                ruleForm1: { // 设置密码
                    password: '',
                    confirmPassword: ''
                },
                rules1: {
                    password: [
                        { required: true, validator: validatePayPassword1, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, validator: validateConfirmPassword1, trigger: 'blur' }
                    ]
                },

                ruleForm2: { // 忘记密码
                    mobile: '',
                    code: ''
                },
                rules2: {
                    mobile: [
                        { required: true, validator: validateLoginNames2, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                forgetPassword: false,
                ruleForm3: { // 设置密码
                    password: '',
                    confirmPassword: ''
                },
                rules3: {
                    password: [
                        { required: true, validator: validatePassword3, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, validator: validateConfirmPassword3, trigger: 'blur' }
                    ]
                },

                ruleForm4: { // 修改设置密码
                    oldPassword: '',
                    payPassword: '',
                    newPayPassword: ''
                },
                rules4: {
                    oldPassword: [
                        { required: true, validator: validateOldPassword4, trigger: 'blur' }
                    ],
                    payPassword: [
                        { required: true, validator: validatePayPassword4, trigger: 'blur' }
                    ],
                    newPayPassword: [
                        { required: true, validator: validateNewPayPassword4, trigger: 'blur' }
                    ]
                },
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.user.accessToken,
                mobile: state => state.user.mobile,
                loginName: state => state.user.loginName,
                bindPayPassword: state => state.user.bindPayPassword,
            }),
        },
        watch: {
        },
        created() {
        },
        mounted() {
            if(this.$route.query.memberPassword!=undefined&&this.$route.query.memberPassword!=''&&this.$route.query.memberPassword!=null) {
                this.memberPassword = this.$route.query.memberPassword
            }
            console.log(this.bindPayPassword==1?(this.$route.query.memberPassword==2||this.memberPassword==2?'修改交易密码':'忘记交易密码'):'设置交易密码');
        },
        destroyed() {
        },
        methods: {
            async getCode(obj) {
                let _this = this;
                let data = {
                    loginType: "3", // 登陆类型 1：管理员 2：普通用户 3：会员用户
                    loginSource: 1, // 登陆客户端 1：pc
                    type: "4", // 类型 1：注册验证码 2：修改密码验证码 3：忘记密码验证码 4：验证身份验证码 5.管理员登陆 6快捷登陆
                    loginName: _this.ruleForm2.mobile
                }
                var regMobile = /^[1]\d{10}$/;
                if (_this.countdown == 60) {
                    if (_this.ruleForm2.mobile === '') {
                        _this.$message({
                            showClose: true,
                            message: '请输入手机号码',
                            type: 'error'
                        });
                        return false;
                    } else if(!regMobile.test(_this.ruleForm2.mobile)){
                        _this.$message({
                            showClose: true,
                            message: '请输入正确的手机号码',
                            type: 'error'
                        });
                        return false;
                    }
                    verificationCodeCreate(this.$qs.stringify(data)).then(res => {
                        if (res.code == 200) {
                            _this.$message({
                                showClose: true,
                                message: '发送成功',
                                type: 'success'
                            });
                            //倒计时
                            _this.timer();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }
            },
            timer() {
                let _this = this;
                _this.time1 = setInterval(function () {
                    _this.setTime()
                }, 1000)
            },
            setTime() {
                let _this = this;
                if (_this.countdown <= 0) {
                    _this.showCode = false;
                    _this.countdown = 60;
                    setTimeout(function () {
                        _this.codeText = "重新获取";
                    }, 5000)
                    clearInterval(_this.time1);
                    return;
                } else {
                    _this.showCode = true;
                    _this.countdown--;
                }
            },
            // 第一次设置交易密码
            async submitForm(formName) {
                let params = {
                    payPassword: this.ruleForm1.password
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.setPayPassword(params);
                    } else {
                        return false;
                    }
                });
            },
            // 修改密码
            async modifyPassword(formName) {
                let params = {
                    payPassword: this.ruleForm4.oldPassword,
                    newPayPassword: this.ruleForm4.newPayPassword
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.updatePayPassword(params);
                    } else {
                        return false;
                    }
                });
            },
            async updatePayPassword(params) {
                await this.$api.updatePayPassword(this.$qs.stringify(params),getCookie('accessToken'));
                this.$message({
                    message: '交易密码修改成功！',
                    type: 'success'
                });
                this.$router.push({path: '/myAccount/accountIinfo'});
            },
            // 忘记交易密码下一步
            async nextStep(formName) {
                let params = {
                    idCard: '',
                    name: '',
                    mobile: this.ruleForm2.mobile,
                    code: this.ruleForm2.code
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        this.validateMemberIdentity2(params);
                    } else {
                        return false;
                    }
                });
            },
            async validateMemberIdentity2(params) {
                await this.$api.validateMemberIdentity(this.$qs.stringify(params),getCookie('accessToken'));
                this.forgetPassword = true;
            },
            // 忘记交易密码-设置完成
            async setPassword(formName) {
                let params = {
                    payPassword: this.ruleForm3.password
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.setPayPassword(params);
                    } else {
                        return false;
                    }
                });
            },
            // 设置交易密码接口
            async setPayPassword(params) {
                await this.$api.setPayPassword(this.$qs.stringify(params),getCookie('accessToken'));
                // 设置交易密码成功 更新bindPayPassword状态
                if(this.bindPayPassword!=1) {
                    this.$store.commit('user/SET_BINDPAYPASSWORD', '1');
                    setCookie('bindPayPassword','1');
                }
                this.$message({
                    message: '交易密码设置成功！',
                    type: 'success'
                });
                if(this.$route.query.url == location.hostname) {
                    this.$router.go(-1)
                } else {
                    this.$router.push({path: '/myAccount/accountIinfo'});
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    .tradersPassword{
        .title{
            color: rgb(185, 115, 10);
        }
        .info_centent {
            .first,.second,.third {
                margin: 90px 200px;
                .inp-sm {
                    width: 300px;
                    float: left;
                    overflow: hidden;
                }
                .getCode {
                    display: block;
                    float: right;
                    font-size: 12px;
                    width: 98px;
                    height: 36px;
                    line-height: 36px;
                    color: var(--white);
                    background-color: var(--orange);
                    cursor: pointer;
                    padding: 0 5px 0 5px;
                    text-align: center;
                }
                .reset-button {
                    display: block;
                    float: right;
                    font-size: 12px;
                    width: 98px;
                    height: 36px;
                    line-height: 36px;
                    color: var(--white);
                    background-color: #dddddd;
                    border: 1px #ddd solid;
                    padding: 0 5px 0 5px;
                    text-align: center;
                }
            }
        }
    }
</style>
