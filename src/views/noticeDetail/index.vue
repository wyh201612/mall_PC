<template>
    <div class="noticeDetail-container">
        <div class="main inghong-container">
            <div class="container clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/noticeList',query:{name: name} }">{{name}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{name}}详情</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="margin-top">
                    <div class="text-sxll text-bold text-blackDark title ">{{noticeDetail.title}}</div>
                    <div class="flex flex-row align-center justify-between msg">
                        <div class="flex flex-row align-center">
                            <span class="mas text-orangeDark text-center text-bold ">·{{name}}·</span>
                            <span class="text-xlx text-orangeDark text-bold ">{{noticeDetail.addTimeString}}</span>
                        </div>
                        <div class="text-gray text-lg" v-if="!isArticle">来源：{{noticeDetail.author}}</div>
                        <div class="text-gray text-lg" v-if="isArticle">来源：{{noticeDetail.source}}</div>
                    </div>
                    <div v-html="noticeDetail.content">{{noticeDetail.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCookie, setCookie, removeCookie } from '@/utils/auth'
    export default {
        name: 'noticeDetail',
        components: {},
        inject: ["eventHub"],
        data() {
            return {
                noticeDetail: {},
                isArticle: false,
                name: ''
            }
        },
        watch: {

        },
        created() {
        },
        mounted() {
            this.isArticle = this.$route.query.isArticle;
            this.name = this.$route.query.name;
            this.updateNoticeStatus()
        },
        destroyed() {

        },
        methods: {
            async getNoticeDetail() {
                this.noticeDetail = await this.$api.getNoticeDetail('',this.$route.query.id);
            },
            async getArticle() {
                this.noticeDetail = await this.$api.getArticle('',this.$route.query.id);
            },
            async updateNoticeStatus() {
                await this.$api.updateNoticeStatus('',this.$route.query.id,getCookie('accessToken'));
                if(this.isArticle=='true') {
                    this.getArticle();
                } else {
                    this.getNoticeDetail();
                }
                this.eventHub.$emit("notice");
            }
        }
    }

</script>
<style lang="scss">
    .noticeDetail-container {
        .el-breadcrumb__inner, .el-breadcrumb__inner a {
            font-size: 16px;
        }
        .el-breadcrumb__inner.is-link:hover, .el-breadcrumb__inner a:hover {
            color: var(--orangeLight);
        }
        .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
            color: var(--darkGray);
        }
    }
</style>
<style lang="scss" scoped>
    .noticeDetail-container {
        overflow: hidden;
        background-color: var(--white);
        .main {
            overflow: hidden;
            margin-bottom: 40px;
            margin-top: 20px;

            .container {
                margin: 0 auto;
                width: 1200px;
                min-height: 500px;
                .title {
                    margin-bottom: 27px;
                    margin-top: 80px;
                }
                .msg {
                    margin-bottom: 50px;
                }
                .mas {
                    display: inline-block;
                    width: 57px;
                    padding: 2px 0;
                    font-size: 15px;
                    border-radius: 16px;
                    border:1px solid;
                    margin-right: 27px;
                }
            }
        }
    }

</style>
