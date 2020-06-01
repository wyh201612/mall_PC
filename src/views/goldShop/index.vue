<template>
    <div ref="ssss" class="dashboard-container bg-white">
        <div ref="banner" class="goods-banner" :style="goodsListBanner.length!=0?'background-image: url('+goodsListBanner[0].imgUrl+')':''"></div>
        <div class="shop inghong-container">
            <div ref="J_NavAttrs" class="margin-bottom-sm">
                <div class="flex flex-row align-center justify-between" style="margin: 3px 0 15px 25px;height: 32px;">
                    <div>
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="flex flex-row align-center">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>全部商品</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="allCheckList.categorycheckList.length!=0||allCheckList.brandcheckList.length!=0||allCheckList.labelcheckList.length!=0">
                                <span v-if="allCheckList.categorycheckList.length!=0">
                                    <span class="pointer crumbAttr" @click="remove('categoryList')">
                                        分类:<span v-for="(item, index) in allCheckList.categorycheckList" :key="index">{{item.name}}{{allCheckList.categorycheckList.length-1!=index?'、':''}}</span>
                                        <i class="el-icon-close text-bold"></i>
                                    </span>
                                </span>
                                <span v-if="allCheckList.brandcheckList.length!=0">
                                    <span class="pointer crumbAttr" @click="remove('brandList')">
                                        品牌:<span v-for="(item, index) in allCheckList.brandcheckList" :key="index">{{item.name}}{{allCheckList.brandcheckList.length-1!=index?'、':''}}</span>
                                        <i class="el-icon-close text-bold"></i>
                                    </span>
                                </span>
                                <span v-if="allCheckList.labelcheckList.length!=0">
                                    <span class="pointer crumbAttr" @click="remove('labelList')">
                                        推荐:<span v-for="(item, index) in allCheckList.labelcheckList" :key="index">{{item.name}}{{allCheckList.labelcheckList.length-1!=index?'、':''}}</span>
                                        <i class="el-icon-close text-bold"></i>
                                    </span>
                                </span>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="goodsNumber text-darkGray text-df margin-right-sm">
                        共<span class="text-bold"> {{total}} </span>件相关商品
                    </div>
                </div>
                <div class="option-box flex flex-direction text-sm">
                    <div class="flex flex-row attr" v-show="allCheckList.categorycheckList.length<1">
                        <div class="text-blackDark attrKey">分 类</div>
                        <div class="flex flex-direction flex-sub bg-white">
                            <!-- 单选 -->
                            <div class="attrValue flex-sub" v-show="!show_category_Multiple">
                                <div class="ul" :class="iscategoryMoer?'ulAuto':''" v-show="!show_category_Multiple&&!show_brand_Multiple&&!show_label_Multiple">
                                    <el-checkbox-group v-model="categoryList" @change="handleChecked">
                                        <el-checkbox :label="item.id" v-for="(item,index) in categorySearchList" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="ul" :class="iscategoryMoer?'ulAuto':''" v-show="show_category_Multiple||show_brand_Multiple||show_label_Multiple">
                                    <el-checkbox-group v-model="expandCategoryList" @change="handleChecked">
                                        <el-checkbox :label="item.id" v-for="(item,index) in categorySearchList" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <!-- 多选 -->
                            <div class="attrValue av-expand" v-show="show_category_Multiple">
                                <el-checkbox-group v-model="expandCategoryList" @change="handleCheckedExpand">
                                    <el-checkbox :label="item.id" v-for="(item,index) in categorySearchList" :key="index">{{item.name}}<i class="el-icon-close text-bold"></i><span class="border"></span></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="sopa">
                                <div class="av-options pointer text-sm" @click="j_Multiple('category')" v-show="!show_category_Multiple"><i class="el-icon-plus text-bold" style="margin: 0 1px 0 5px;"></i> 多选</div>
                                <div class="j_More avo-more pointer text-sm" @click="j_Multiple_moer('category')" v-show="categorySearchList.length>14">{{iscategoryMoer?'收起':'更多'}} <i class="text-bold" :class="iscategoryMoer?'el-icon-arrow-up':'el-icon-arrow-down'" style="margin: 0 1px 0 5px;"></i></div>
                            </div>
                            <div class="av-btns pointer text-sm text-center padding-bottom-xs" v-show="show_category_Multiple">
                                <a href="javascript:" class="j_SubmitBtn ui-btn-s-primary" @click="submitBtn" v-show="expandCategoryList.length>0">确定</a>
                                <a href="javascript:" class="j_SubmitBtn ui-btn-s-primary ui-btn-disable"  v-show="expandCategoryList.length<=0">确定</a>
                                <a href="javascript:" class="j_CancelBtn ui-btn-s" @click="close('category')">取消</a>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row attr" v-show="allCheckList.brandcheckList.length<1">
                        <div class="text-blackDark attrKey">品 牌</div>
                        <div class="flex flex-direction flex-sub bg-white">
                            <!-- 单选 -->
                            <div class="attrValue flex-sub" v-show="!show_brand_Multiple">
                                <div class="ul" :class="isbrandMoer?'ulAuto':''" v-show="!show_category_Multiple&&!show_brand_Multiple&&!show_label_Multiple">
                                    <el-checkbox-group v-model="brandList" @change="handleChecked">
                                        <el-checkbox :label="item.id" v-for="(item,index) in brandSearchList" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="ul" :class="isbrandMoer?'ulAuto':''" v-show="show_category_Multiple||show_brand_Multiple||show_label_Multiple">
                                    <el-checkbox-group v-model="expandBrandList" @change="handleChecked">
                                        <el-checkbox :label="item.id" v-for="(item,index) in brandSearchList" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <!-- 多选 -->
                            <div class="attrValue av-expand" v-show="show_brand_Multiple">
                                <el-checkbox-group v-model="expandBrandList" @change="handleCheckedExpand">
                                    <el-checkbox :label="item.id" v-for="(item,index) in brandSearchList" :key="index">{{item.name}}<i class="el-icon-close text-bold"></i><span class="border"></span></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="sopa">
                                <div class="av-options pointer text-sm" @click="j_Multiple('brand')" v-show="!show_brand_Multiple"><i class="el-icon-plus text-bold" style="margin: 0 1px 0 5px;"></i> 多选</div>
                                <div class="j_More avo-more pointer text-sm" @click="j_Multiple_moer('brand')" v-show="brandSearchList.length>14">{{isbrandMoer?'收起':'更多'}} <i class="text-bold" :class="isbrandMoer?'el-icon-arrow-up':'el-icon-arrow-down'" style="margin: 0 1px 0 5px;"></i></div>
                            </div>
                            <div class="av-btns pointer text-sm text-center padding-bottom-xs" v-show="show_brand_Multiple">
                                <a href="javascript:" class="j_SubmitBtn ui-btn-s-primary" @click="submitBtn" v-show="expandBrandList.length>0">确定</a>
                                <a href="javascript:" class="j_SubmitBtn ui-btn-s-primary ui-btn-disable"  v-show="expandBrandList.length<=0">确定</a>
                                <a href="javascript:" class="j_CancelBtn ui-btn-s" @click="close('brand')">取消</a>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row attr" v-show="allCheckList.labelcheckList.length<1">
                        <div class="text-blackDark attrKey">推 荐</div>
                        <div class="flex flex-direction flex-sub bg-white">
                            <!-- 单选 -->
                            <div class="attrValue flex-sub" v-show="!show_label_Multiple">
                                <div class="ul" :class="islabelMoer?'ulAuto':''" v-show="!show_category_Multiple&&!show_brand_Multiple&&!show_label_Multiple">
                                    <el-checkbox-group v-model="labelList" @change="handleChecked">
                                        <el-checkbox :label="item.id" v-for="(item,index) in labelSearchList" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="ul" :class="islabelMoer?'ulAuto':''" v-show="show_category_Multiple||show_brand_Multiple||show_label_Multiple">
                                    <el-checkbox-group v-model="expandLabelList" @change="handleChecked">
                                        <el-checkbox :label="item.id" v-for="(item,index) in labelSearchList" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <!-- 多选 -->
                            <div class="attrValue av-expand" v-show="show_label_Multiple">
                                <el-checkbox-group v-model="expandLabelList" @change="handleCheckedExpand">
                                    <el-checkbox :label="item.id" v-for="(item,index) in labelSearchList" :key="index">{{item.name}}<i class="el-icon-close text-bold"></i><span class="border"></span></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="sopa">
                                <div class="av-options pointer text-sm" @click="j_Multiple('label')" v-show="!show_label_Multiple"><i class="el-icon-plus text-bold" style="margin: 0 1px 0 5px;"></i> 多选</div>
                                <div class="j_More avo-more pointer text-sm" @click="j_Multiple_moer('label')" v-show="labelSearchList.length>14">{{islabelMoer?'收起':'更多'}} <i class="text-bold" :class="islabelMoer?'el-icon-arrow-up':'el-icon-arrow-down'" style="margin: 0 1px 0 5px;"></i></div>
                            </div>
                            <div class="av-btns pointer text-sm text-center padding-bottom-xs" v-show="show_label_Multiple">
                                <a href="javascript:" class="j_SubmitBtn ui-btn-s-primary" @click="submitBtn" v-show="expandLabelList.length>0">确定</a>
                                <a href="javascript:" class="j_SubmitBtn ui-btn-s-primary ui-btn-disable"  v-show="expandLabelList.length<=0">确定</a>
                                <a href="javascript:" class="j_CancelBtn ui-btn-s" @click="close('label')">取消</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sort flex flex-row align-center justify-between" :class="{'filter-fix':isFixed}">
                <div class="text-darkGray">
                    <a href="javascript:" :title="!sortAsc&&sortDes?'点击后回复默认排序':!sortAsc&&!sortDes?'点击后按价格升序':sortAsc&&!sortDes?'点击后按价格降序':''" @click="sortAscDes">
                        <span class="pointer sort-btn">价格
                            <i class="f-ico-triangle-mt" :class="{'f-ico-triangle-mt-slctd':sortAsc}"></i>
                            <i class="f-ico-triangle-mb" :class="{'f-ico-triangle-mb-slctd':sortDes}"></i>
                        </span>
                    </a>
                </div>
                <div>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 40, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
            <div ref="J_FilterPlaceholder" class="J_FilterPlaceholder" :style="isFixed?'height: 42px;':'display: none;'"></div>
            <div class="goods-list">
                <div class="flex flex-row flex-wrap">
                    <div class="goods-item pointer" v-for="(item, index) in allLists" :key="index">
                        <router-link target="_blank" :to="{path:'/goldShopDetail',query: {id: item.id}}">
                            <img v-if="item.promotionalLableList" :src="item.promotionalLableList[0].url" alt="" class="cornerMarker">
                            <div class="goods-item-top">
                                <div class="goodsImg" :style="{'background-image': 'url('+item.imgUrl+')'}"></div>
                            </div>
                            <div class="goods-item-bottom text-center">
                                <a class="text-blackDark goodsName" :href="'goldShopDetail?id='+item.id" target="_blank" :title="item.name">{{item.name}}</a>
                                <!-- <div class="text-darkGray">领券满减</div> -->
                                <div class="text-blackDark">
                                    <span>{{item.minGram.toFixed(2)}}g</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="text-price text-orangeDark text-bold text-lg">{{item.minPrice.toFixed(2)}}</span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <el-pagination
                    style="text-align: center;padding-top: 20px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 40, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
            <div class="bottom-tip clearfix">
                <div class="block">
                    <img src="../../assets/images/sc_pinlei_image.png" alt="">
                    <div>
                    <p>品类齐全</p>
                    <p>商品种类，应有尽有</p>
                    </div>
                </div>
                <div class="block">
                    <img src="../../assets/images/sc_kuaidi_image.png" alt="">
                    <div>
                    <p>快速配送</p>
                    <p>闪电发货，极速送达</p>
                    </div>
                </div>
                <div class="block">
                    <img src="../../assets/images/sc_zhengpin_image.png" alt="">
                    <div>
                    <p>100%正品</p>
                    <p>正规渠道，正品保证</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'goldShop',
    components: {

    },
    props:{
        goodsListBanner:{
            type: Array
        },
        headerHeight:{
            type: Number
        },
    },
    data() {
        return {
            offsetHeight: '',
            isFixed: false,

            categorySearchList: {},
            categoryList: [],
            show_category_Multiple: false,
            iscategoryMoer: false,

            brandSearchList: {},
            brandList: [],
            show_brand_Multiple: false,
            isbrandMoer: false,
            
            labelSearchList: {},
            labelList: [],
            show_label_Multiple: false,
            islabelMoer: false,

            allCheckList: {
                categorycheckList: [],
                brandcheckList: [],
                labelcheckList: [],
            },

            expandCategoryList: [],
            expandBrandList: [],
            expandLabelList: [],
            

            allLists: {},
            currentPage: 1,
            pageSize: 20,
            total: 0,
            sortAsc: false, // 价格升序排序
            sortDes: false, // 价格降序排序
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        this.categorySearch();
        this.brandSearch();
        this.labelSearch(1);
        this.listMallGoods(this.currentPage,this.pageSize,'','','','');
        window.addEventListener('scroll', this.scrollHander);
    },
    methods: {
        scrollHander() {
            // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
            this.isFixed = scrollTop > this.offsetHeight + 2 ? true : false;
        },
        // 获取商品分类
        async categorySearch() {
            this.categorySearchList = await this.$api.categorySearch('');
        },
        // 获取品牌分类
        async brandSearch() {
            this.brandSearchList = await this.$api.brandSearch('');
        },
        // 获取推广角标
        async labelSearch(type) {
            this.labelSearchList = await this.$api.labelSearch('',type);
            await this.getHeight();
        },
        /**
         * 按条件搜索获取商品
         * pageNum int 否  页数
         * pageSize int 否  行数
         * categoryIdArr 商品分类 1:金条 2:金饰 传值格式 1,2
         * brandIdArr 品牌分类id数组 传值格式 id1,id2
         * promotionalLableIdArr 推广角标id数组 传值格式 荐标识id1,荐标识id2
         * priceSort  0 按最小价格 1 按最大价格
         * 接口地址:  mall/goods/listMallGoods
         */
        async listMallGoods(pageNum,pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort) {
            let params = {
                pageNum: pageNum,
                pageSize: pageSize,
                categoryIdArr: categoryIdArr,
                brandIdArr: brandIdArr,
                promotionalLableIdArr: promotionalLableIdArr,
                priceSort: priceSort
            }
            let data = await this.$api.listMallGoods(params);
            this.allLists = data.dataList;
            this.total = data.page.total;
        },
        // 每页多少条操作
        async handleSizeChange(val) {
            this.pageSize = val;
            let categoryIdArr = '';
            let brandIdArr = '';
            let promotionalLableIdArr = '';
            if(this.show_category_Multiple||this.show_brand_Multiple||this.show_label_Multiple) {
                categoryIdArr = this.expandCategoryList.join(',');
                brandIdArr = this.expandBrandList.join(',');
                promotionalLableIdArr = this.expandLabelList.join(',');
            } else {
                categoryIdArr = this.categoryList.join(',');
                brandIdArr = this.brandList.join(',');
                promotionalLableIdArr = this.labelList.join(',');
            }

            let priceSort = '';
            if(!this.sortAsc&&this.sortDes) { // 价格降序
                priceSort = '1';
            }
            if(!this.sortAsc&&!this.sortDes) { // 默认排序
                priceSort = '';
            }
            if(this.sortAsc&&!this.sortDes) { // 价格升序
                priceSort = '0';
            }
            await this.listMallGoods(this.currentPage, this.pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort);
            // 滚动到指定位置
            await this.getHeight();
            document.documentElement.scrollTop = this.offsetHeight;
        },
        // 分页操作
        async handleCurrentChange(val) {
            this.currentPage = val;
            let categoryIdArr = '';
            let brandIdArr = '';
            let promotionalLableIdArr = '';
            if(this.show_category_Multiple||this.show_brand_Multiple||this.show_label_Multiple) {
                categoryIdArr = this.expandCategoryList.join(',');
                brandIdArr = this.expandBrandList.join(',');
                promotionalLableIdArr = this.expandLabelList.join(',');
            } else {
                categoryIdArr = this.categoryList.join(',');
                brandIdArr = this.brandList.join(',');
                promotionalLableIdArr = this.labelList.join(',');
            }
            
            let priceSort = '';
            if(!this.sortAsc&&this.sortDes) { // 价格降序
                priceSort = '1';
            }
            if(!this.sortAsc&&!this.sortDes) { // 默认排序
                priceSort = '';
            }
            if(this.sortAsc&&!this.sortDes) { // 价格升序
                priceSort = '0';
            }
            await this.listMallGoods(this.currentPage, this.pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort);
            // 滚动到指定位置
            await this.getHeight();
            document.documentElement.scrollTop = this.offsetHeight;
        },
        // 删除选中的项
        async remove(list) {
            if(list=='categoryList'){
                this.categoryList = [];
                this.expandCategoryList = [];
                this.allCheckList.categorycheckList = [];
                this.show_category_Multiple = false;
            }
            if(list=='brandList'){
                this.brandList = [];
                this.expandBrandList = [];
                this.allCheckList.brandcheckList = [];
                this.show_brand_Multiple = false;
            }
            if(list=='labelList'){
                this.labelList = [];
                this.expandLabelList = [];
                this.allCheckList.labelcheckList = [];
                this.show_label_Multiple = false;
            }
            let categoryIdArr = '';
            let brandIdArr = '';
            let promotionalLableIdArr = '';
            if(this.show_category_Multiple||this.show_brand_Multiple||this.show_label_Multiple) { // 多选的时候
                categoryIdArr = this.expandCategoryList.join(',');
                brandIdArr = this.expandBrandList.join(',');
                promotionalLableIdArr = this.expandLabelList.join(',');
            } else {
                categoryIdArr = this.categoryList.join(',');
                brandIdArr = this.brandList.join(',');
                promotionalLableIdArr = this.labelList.join(',');
            }
            
            let priceSort = '';
            if(!this.sortAsc&&this.sortDes) { // 价格降序
                priceSort = '1';
            }
            if(!this.sortAsc&&!this.sortDes) { // 默认排序
                priceSort = '';
            }
            if(this.sortAsc&&!this.sortDes) { // 价格升序
                priceSort = '0';
            }
            await this.listMallGoods(this.currentPage, this.pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort);
            await this.getHeight();
        },
        // 单选框选择
        async handleChecked(value) {
            let categorycheckList = [];
            let brandcheckList = [];
            let labelcheckList = [];
            let categoryIdArr = '';
            let brandIdArr = '';
            let promotionalLableIdArr = '';
            if(this.show_category_Multiple||this.show_brand_Multiple||this.show_label_Multiple) { // 多选弹窗显示并且选择了数据的时候
                this.categorySearchList.map((item) => {
                    this.categoryList.map((item2)=>{
                        if(item.id==item2){
                            categorycheckList.push(item);
                        }
                    })
                })
                this.categorySearchList.map((item) => {
                    this.expandCategoryList.map((item2)=>{
                        if(item.id==item2){
                            categorycheckList.push(item);
                        }
                    })
                })
                this.brandSearchList.map((item) => {
                    this.expandBrandList.map((item2)=>{
                        if(item.id==item2){
                            brandcheckList.push(item);
                        }
                    })
                })
                this.labelSearchList.map((item) => {
                    this.expandLabelList.map((item2)=>{
                        if(item.id==item2){
                            labelcheckList.push(item);
                        }
                    })
                })
                categoryIdArr = this.expandCategoryList.join(',');
                brandIdArr = this.expandBrandList.join(',');
                promotionalLableIdArr = this.expandLabelList.join(',');
            } else {
                if(this.expandCategoryList.length!=0) { // 之前多选了选项，现在的要是单选的情况，把多选的数据赋给单选的参数，再把多选的数据清空
                    this.categoryList = this.expandCategoryList;
                    this.expandCategoryList = [];
                }
                if(this.expandBrandList.length!=0) { // 之前多选了选项，现在的要是单选的情况，把多选的数据赋给单选的参数，再把多选的数据清空
                    this.brandList = this.expandBrandList;
                    this.expandBrandList = [];
                }
                if(this.expandLabelList.length!=0) { // 之前多选了选项，现在的要是单选的情况，把多选的数据赋给单选的参数，再把多选的数据清空
                    this.labelList = this.expandLabelList;
                    this.expandLabelList = [];
                }
                this.categorySearchList.map((item) => {
                    this.categoryList.map((item2)=>{
                        if(item.id==item2){
                            categorycheckList.push(item);
                        }
                    })
                })
                this.brandSearchList.map((item) => {
                    this.brandList.map((item2)=>{
                        if(item.id==item2){
                            brandcheckList.push(item);
                        }
                    })
                })
                this.labelSearchList.map((item) => {
                    this.labelList.map((item2)=>{
                        if(item.id==item2){
                            labelcheckList.push(item);
                        }
                    })
                })
                categoryIdArr = this.categoryList.join(',');
                brandIdArr = this.brandList.join(',');
                promotionalLableIdArr = this.labelList.join(',');
            }
            
            this.allCheckList.categorycheckList = categorycheckList;
            this.allCheckList.brandcheckList = brandcheckList;
            this.allCheckList.labelcheckList = labelcheckList;

            this.currentPage = 1;
            this.pageSize = 20;
            let priceSort = '';
            if(!this.sortAsc&&this.sortDes) { // 价格降序
                priceSort = '1';
            }
            if(!this.sortAsc&&!this.sortDes) { // 默认排序
                priceSort = '';
            }
            if(this.sortAsc&&!this.sortDes) { // 价格升序
                priceSort = '0';
            }
            await this.listMallGoods(this.currentPage, this.pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort);
            await this.getHeight();
        },
        // 价格升序降序排序
        async sortAscDes() {
            this.currentPage = 1;
            this.pageSize = 20;
            let categoryIdArr = '';
            let brandIdArr = '';
            let promotionalLableIdArr = '';
            if(this.show_category_Multiple||this.show_brand_Multiple||this.show_label_Multiple) { // 多选的时候
                categoryIdArr = this.expandCategoryList.join(',');
                brandIdArr = this.expandBrandList.join(',');
                promotionalLableIdArr = this.expandLabelList.join(',');
            } else {
                categoryIdArr = this.categoryList.join(',');
                brandIdArr = this.brandList.join(',');
                promotionalLableIdArr = this.labelList.join(',');
            }
            let priceSort = '';
            if(this.sortDes) {
                this.sortAsc = false;
                this.sortDes = false;
                priceSort = '';
            } else {
                if(this.sortAsc) {
                    this.sortAsc = false;
                    this.sortDes = true;
                    priceSort = '1';
                } else {
                    this.sortAsc = true;
                    this.sortDes = false;
                    priceSort = '0';
                }
            }
            await this.listMallGoods(this.currentPage, this.pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort);
            await this.getHeight();
            // 滚动到指定位置
            document.documentElement.scrollTop = this.offsetHeight;
        },
        // 获取高度
        async getHeight() {
            var bannerHeight = this.$refs.banner.offsetHeight;
            var J_NavAttrsHeight = this.$refs.J_NavAttrs.offsetHeight;
            this.offsetHeight = this.headerHeight + bannerHeight + J_NavAttrsHeight + 2;
        },
        // 更多按钮
        j_Multiple_moer(name) {
            if(name=='category') {
                this.iscategoryMoer = !this.iscategoryMoer;
            }
            if(name=='brand') {
                this.isbrandMoer = !this.isbrandMoer;
            }
            if(name=='label') {
                this.islabelMoer = !this.islabelMoer;
            }
        },
        // 显示多选框
        j_Multiple(name) {
            if(name=='category') {
                this.show_category_Multiple = true;
            }
            if(name=='brand') {
                this.show_brand_Multiple = true;
            }
            if(name=='label') {
                this.show_label_Multiple = true;
            }
        },
        // 多选操作
        handleCheckedExpand(val) {
            console.log(val)
        },
        // 多选确定按钮
        async submitBtn() {
            let categorycheckList = [];
            let brandcheckList = [];
            let labelcheckList = [];
            if(this.categoryList.length!=0) { // 之前单选了选项，现在的要是多选的情况，把单选的数据赋给多选的参数，再把单选的数据清空
                this.expandCategoryList = this.categoryList;
                this.categoryList = [];
            }
            if(this.brandList.length!=0) { // 之前单选了选项，现在的要是多选的情况，把单选的数据赋给多选的参数，再把单选的数据清空
                this.expandBrandList = this.brandList;
                this.brandList = [];
            }
            if(this.labelList.length!=0) { // 之前单选了选项，现在的要是多选的情况，把单选的数据赋给多选的参数，再把单选的数据清空
                this.expandLabelList = this.labelList;
                this.labelList = [];
            }
            this.categorySearchList.map((item) => {
                this.expandCategoryList.map((item2)=>{
                    if(item.id==item2){
                        categorycheckList.push(item);
                    }
                })
            })
            this.brandSearchList.map((item) => {
                this.expandBrandList.map((item2)=>{
                    if(item.id==item2){
                        brandcheckList.push(item);
                    }
                })
            })
            this.labelSearchList.map((item) => {
                this.expandLabelList.map((item2)=>{
                    if(item.id==item2){
                        labelcheckList.push(item);
                    }
                })
            })
            this.allCheckList.categorycheckList = categorycheckList;
            this.allCheckList.brandcheckList = brandcheckList;
            this.allCheckList.labelcheckList = labelcheckList;

            this.currentPage = 1;
            this.pageSize = 20;
            let categoryIdArr = this.expandCategoryList.join(',');
            let brandIdArr = this.expandBrandList.join(',');
            let promotionalLableIdArr = this.expandLabelList.join(',');
            let priceSort = '';
            if(!this.sortAsc&&this.sortDes) { // 价格降序
                priceSort = '1';
            }
            if(!this.sortAsc&&!this.sortDes) { // 默认排序
                priceSort = '';
            }
            if(this.sortAsc&&!this.sortDes) { // 价格升序
                priceSort = '0';
            }
            await this.listMallGoods(this.currentPage, this.pageSize,categoryIdArr,brandIdArr,promotionalLableIdArr,priceSort);
            await this.getHeight();
        },
        // 多选弹框关闭
        async close(name) {
            if(name=='category') {
                this.show_category_Multiple = false;
                this.expandCategoryList = [];
            }
            if(name=='brand') {
                this.show_brand_Multiple = false;
                this.expandBrandList = [];
            }
            if(name=='label') {
                this.show_label_Multiple = false;
                this.expandLabelList = [];
            }
            await this.getHeight();
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollHander)
    }
}
</script>
<style lang="scss">
    /* 复选框 */
    .shop .el-checkbox__input {
        display: none;
    }
    // .shop .el-checkbox__input.is-checked .el-checkbox__inner {
    //     background-color: var(--orangeDark);
    //     border-color: var(--orangeDark);
    // }
    // .shop .el-checkbox__input.is-focus .el-checkbox__inner {
    //     border-color: var(--orangeDark);
    // }
    // .shop .el-checkbox__input .el-checkbox__inner:hover {
    //     border-color: var(--orangeDark);
    // }
    .shop .el-checkbox__label {
        font-size: 12px;
    }
    .shop .el-checkbox__input.is-checked + .el-checkbox__label {
        color: inherit;
    }
    .shop .el-checkbox {
        &:hover .el-checkbox__label {
            color: var(--orangeDark);
            i{
                background: var(--orangeDark) !important;
            }
        }
    }
    /* 复选框 end */
</style>
<style lang="scss" scoped>
    .goods-banner {
        width: 100%;
        min-width: 1200px;
        height: 390px;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        padding-bottom: 10px;
    }
    .shop {
        padding-bottom: 45px;
        .crumbAttr {
            height: 26px;
            line-height: 25px;
            margin: 4px 0 4px 10px;
            padding-right: 9px;
            border-radius: 2px;
            border: 1px dotted var(--orangeDark);
            padding-left: 9px;
            display: inline-block;
            color: var(--orangeDark);
            i {
                color: var(--red);
            }
        }
        .option-box {
            border: 1px solid #E6E2E1;
            .attr {
                position: relative;
                min-height: 36px;
                background-color: #F7F5F5;
                border-bottom: 1px dotted rgb(209, 204, 199);
                .attrKey {
                    padding: 8px 0 0;
                    width: 10%;
                    color: #B0A59F;
                    text-indent: 13px;
                }
                .attrValue {
                    padding: 8px 116px 8px 25px;
                    .ul {
                        height: 21px;
                        overflow: hidden;
                        &.ulAuto {
                            height: auto;
                        }
                    }
                }
                &:last-child {
                    border-bottom: 0;
                }
                .el-checkbox {
                    color: #806F66;
                    .el-checkbox__input {
                        display: none;
                    }
                }
                .sopa {
                    position: absolute;
                    right: 0;
                    top: 0;
                    .av-options {
                        display: inline-block;
                        background-color: #F2F0EF;
                        border: 1px solid #EFEBE9;
                        color: #806F66;
                        margin: 10px 10px 5px 0;
                        padding-right: 3px;
                        text-align: right;
                    }
                    .avo-more {
                        display: inline-block;
                        vertical-align: middle;
                        position: relative;
                        padding: 0 5px 0 0;
                        color: #806f66;
                    }
                }
                .av-btns {
                    a {
                        outline: 0;
                        margin: 1px 5px;
                    }
                    .ui-btn-s-primary,.ui-btn-s {
                        height: 20px;
                        line-height: 20px;
                        font-weight: 400;
                        padding: 0 10px;
                        display: inline-block;
                        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAJYCAIAAAAsaRvIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVVJREFUeNrEU01PhEAMneKaDcjf9zdpDH8ALiZmgZPZg3pRZirtTscuA4TdsHh4aefrvfYV4PHBwItJEmNMAPZw4KPPbYgY1hZOeN8h3/0Gfg+HAZ/mtfK2R9fnnY8/nCNHRr//eo/6PTxBsrgmp7TkzseduQVf5J/0yvBvxVMX9DDo6ihax4WeCs56ULV2oL1G3u8G3r/tzn1+7rWurXvsjN58JmYrjdF5DGeCaq2/9VNNqPJYT+4evW9LZxT+rajfeG7Wf2N6hvqMZneYmNsaven6/u4i518Ts9xAF4qiAOdc7Csig84k6txaG/YIWZYlZVly/WN8o7NTvJqT4n6/p9qYr67riPfS+gjCszbfVL/COYTmHXqg13meX+zpWD9ToJ7SNJ31eY0+KG+aZjONOa/o3hK9OX19RjOqquqqGU31P9ezYMncbtEvxbZt/0v3V4ABAD5jbqOZlYnpAAAAAElFTkSuQmCC) repeat-x;
                        color: #fff;
                        border: 0;
                        border-left: 1px solid #bf0202;
                        border-right: 1px solid #bf0202;
                        cursor: pointer;
                        outline: 0;
                        overflow: visible;
                        border-radius: 2px;
                    }
                    .ui-btn-s {
                        background-position: 0 -300px;
                        background-color: #ccc;
                        border-color: #ccc;
                        color: #333;
                    }
                    .ui-btn-disable {
                        border: 1px solid #ccc;
                        background: #f2f2f2;
                        color: #c5c5c5;
                        cursor: default;
                        margin: 0 5px;
                    }
                }
                .av-expand {
                    height: 145px !important;
                    margin-bottom: 5px;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    padding: 8px 15px 0px 25px;
                    .el-checkbox {
                        width: 150px;
                        padding: 0 19px 0 3px;
                        margin: 0 24px 8px 0;
                        &.is-checked {
                            i {
                                display: block;
                            }
                            .border {
                                border: 1px solid #B0A59F;
                                width: 100%;
                                height: 21px;
                                position: absolute;
                                top: 0;
                                left: 0;
                                &:hover {
                                    border-color: var(--orangeDark);
                                }
                            }
                        }
                        &:nth-of-type(6n) {
                            margin-right: 0;
                        }
                        i {
                            position: absolute;
                            top: 5px;
                            right: 4px;
                            background: #B0A59F;
                            color: #fff;
                            display: none;
                        }
                    }
                }
            }
        }
        .sort {
            .sort-btn {
                position: relative;
                display: inline-block;
                margin-left: -1px;
                padding: 0 15px 0 5px;
                border: 1px solid #ccc;
                &:hover {
                    color: var(--orangeDark);
                    background: #F1EDEC;
                }
                .f-ico-triangle-mt,.f-ico-triangle-mb {
                    border: 4px solid transparent;
                    height: 0;
                    width: 0;
                    position: absolute;
                }
                .f-ico-triangle-mt {
                    border-bottom: 4px solid #806F66;
                    top: 0px;
                    &.f-ico-triangle-mt-slctd {
                        border-bottom-color: var(--orangeDark);
                        background: #F1EDEC;
                    }
                }
                .f-ico-triangle-mb {
                    top: 11px;
                    border-top: 4px solid #806F66;
                    &.f-ico-triangle-mb-slctd {
                        border-top-color: var(--orangeDark);
                        background: #F1EDEC;
                    }
                }
                
            }
        }
        .goods-list {
            .goods-item {
                position: relative;
                width: 224px;
                margin: 15px 10px;
                padding: 20px 36px;
                background: #fff;
                border-radius: 4px;
                transition: all 0.3s;
                border: 1px solid #f5f5f5;
                &:nth-of-type(5n+1) {
                    margin-left: 0;
                }
                &:nth-of-type(5n) {
                    margin-right: 0;
                }
                &:hover {
                    transform: translate(0, -4px);
                    box-shadow: 0 0 5px var(--orangeLight);
                }
                .goods-item-top {
                    position: relative;
                    background: #fff;
                    .goodsImg {
                        width: 100%;
                        height: 150px;
                        background-size: contain;
                        background-position: center center;
                        background-repeat: no-repeat;
                    }
                }
                .goods-item-bottom {
                    .goodsName {
                        overflow: hidden;
                        width: 100%;
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        margin: 10px 0 0 0;
                        &:hover {
                            color: var(--orangeDark);
                            text-decoration: underline;
                        }
                    }
                }
                .cornerMarker {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 60px;
                    height: 60px;
                    z-index: 9;
                }
            }
        }
        .bottom-tip {
            margin-top: 50px;
            .block {
                float: left;
                padding: 37px 92px;
                background-color: var(--white);
                margin-left: 58px;
                overflow: hidden;
                &:first-child {
                    margin-left: 0;
                }
                div {
                    overflow: hidden;
                }
                img {
                    float: left;
                    width: 35px;
                    margin-right: 15px;
                }
                p {
                    padding-top: 0;
                    font-size: 14px;
                    color: #999999;
                    line-height: 20px;
                }
            }
        }
    }
    .filter-fix {
        position: fixed;
        width: 1200px;
        margin-top: 10px;
        z-index: 999;
        padding: 5px;
        top: -10px;
        box-shadow: 0 1px 5px #ccc;
        background: #faf9f9;
    }
</style>