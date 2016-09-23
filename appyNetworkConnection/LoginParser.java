package com.appy.store.lite.fragments.common;

import java.util.ArrayList;

import org.apache.http.NameValuePair;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.text.TextUtils;

import com.appy.store.lite.R;
import com.appy.store.lite.customviews.CustomAppProgress;
import com.appy.store.lite.utils.HttpConnectionUrl;
import com.appy.store.lite.webservice.RequestParamBuilder;

public class LoginParser {

    /**
     * API Response JSON Tags
     */
    private String RESPONSECODE = "ResponseCode";
    private String RESPONSEDETAILS = "Responsedetails";
    private String RESPONSEMESSAGE = "ResponseMessage";
    private String USERID = "UserId";
    private String UTYPE = "Utype";
    private String USV = "usv";
    private String SMM_KEY = "smm_key";
    private String MSISDN = "msisdn";
    private String IS_ELIGIBLE_FOR_TRIAL_SUBSCRIPTION = "free_sub";
    private String TRIAL_MSG_PRICE = "price";
    private String NUM_WORKSHEET = "num_worksheet";
    private String IS_UPGRADED = "is_upgraded";
    private String IS_TRIAL_EXPIRED = "is_trial_expired";
    private String IS_NEW_USER = "is_new_user";
    private String NUM_DAYS = "num_days";
    private String TINFO = "tinfo";

    private Context context;
    private ArrayList<NameValuePair> postdata = null;
    private String url = "";
    private String responsecode = "";
    private String responseMessage = "";
    private CommonParserObject dataObjectLogin = new CommonParserObject();
    private boolean isTimeOut = false;
    private String KEY = "KEY";
    private boolean show_loading = false;

    public void parse(Context mContext, ArrayList<NameValuePair> postData, boolean show_loading) {
        this.context = mContext;
        this.postdata = postData;
        this.url = context.getResources().getString(R.string.base_url);
        this.show_loading = show_loading;
        Async mAsync = new Async();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
            mAsync.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
        } else {
            mAsync.execute();
        }
    }

    private class Async extends AsyncTask<Void, Void, Void> {

        private CustomAppProgress mpProgressDialog;

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            mpProgressDialog = new CustomAppProgress(context, "Loading...");
            if (show_loading)
                mpProgressDialog.showDialog();

        }

        @Override
        protected Void doInBackground(Void... params) {

            try {
                ArrayList<NameValuePair> headerList = RequestParamBuilder.getHeaderList();
                String[] responsedata = HttpConnectionUrl.post(context, url, postdata, headerList);
                isTimeOut = (!TextUtils.isEmpty(responsedata[0]) && responsedata[0].equals(HttpConnectionUrl.RESPONSECODE_REQUESTSUCCESS)) ? false : true;

                if (!isTimeOut && !TextUtils.isEmpty(responsedata[1])) {
                    parseResponseData(responsedata[1]);
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            super.onPostExecute(result);

            if (mpProgressDialog != null && mpProgressDialog.isShowing())
                mpProgressDialog.hideDialog();

            if (isTimeOut) {
                if (onloginlistner != null) {
                    onloginlistner.OnConnectTimeout();
                }
            } else if (responsecode.equals(HttpConnectionUrl.RESPONSECODE_SUCCESS)) {
                if (onloginlistner != null) {
                    onloginlistner.OnSuccess(dataObjectLogin);
                }
            } else if (responsecode.equals(HttpConnectionUrl.RESPONSECODE_INVALIDCREDENTIAL)) {
                onloginlistner.OnError(responseMessage);
            } else if (responsecode.equals(HttpConnectionUrl.RESPONSECODE_PHNO_NOT_REGISTERED)) {
                onloginlistner.OnError(responseMessage);
            } else {
                onloginlistner.OnError("");
            }
        }
    }

    private void parseResponseData(String responsedataStr) {
        try {
            JSONObject jsonObject = new JSONObject(responsedataStr);
            responsecode = HttpConnectionUrl.getJSONKeyvalue(jsonObject, RESPONSECODE);
            responseMessage = HttpConnectionUrl.getJSONKeyvalue(jsonObject, RESPONSEMESSAGE);
            if (responsecode.equals(HttpConnectionUrl.RESPONSECODE_SUCCESS)) {
                try {
                    dataObjectLogin.setUserId(HttpConnectionUrl.getJSONKeyvalue(jsonObject, USERID));
                    dataObjectLogin.setUtype(HttpConnectionUrl.getJSONKeyvalue(jsonObject, UTYPE));
                    dataObjectLogin.setUsv(HttpConnectionUrl.getJSONKeyvalue(jsonObject, USV));
                    dataObjectLogin.setSmm_key(HttpConnectionUrl.getJSONKeyvalue(jsonObject, SMM_KEY));
                    dataObjectLogin.setMsisdn(HttpConnectionUrl.getJSONKeyvalue(jsonObject, MSISDN));
                    if (jsonObject.has(IS_ELIGIBLE_FOR_TRIAL_SUBSCRIPTION)) {
                        dataObjectLogin.setEligibleForTrialSubscription(!("1".equalsIgnoreCase(HttpConnectionUrl.getJSONKeyvalue(jsonObject, IS_ELIGIBLE_FOR_TRIAL_SUBSCRIPTION))));
                    }else{
                        dataObjectLogin.setEligibleForTrialSubscription(null);
                    }
                    dataObjectLogin.setTrialMsgPrice(HttpConnectionUrl.getJSONKeyvalue(jsonObject,TRIAL_MSG_PRICE));
                    dataObjectLogin.setNumWorksheet(HttpConnectionUrl.getJSONKeyvalue(jsonObject,NUM_WORKSHEET));
                    dataObjectLogin.setNumOfDaysTrial(HttpConnectionUrl.getJSONKeyvalue(jsonObject,NUM_DAYS));

                    dataObjectLogin.setUpgraded("1".equals(HttpConnectionUrl.getJSONKeyvalue(jsonObject,IS_UPGRADED)));
                    dataObjectLogin.setShowTrialNewUser("Y".equalsIgnoreCase(HttpConnectionUrl.getJSONKeyvalue(jsonObject,IS_NEW_USER)));
                    dataObjectLogin.setTrialExpired(jsonObject.has(IS_TRIAL_EXPIRED) && "1".equals(HttpConnectionUrl.getJSONKeyvalue(jsonObject,IS_TRIAL_EXPIRED)));

                    if (jsonObject.has(TINFO)) {
                        dataObjectLogin.setTinfo(HttpConnectionUrl.getJSONKeyvalue(jsonObject,TINFO));
                    }else{
                        dataObjectLogin.setTinfo("");
                    }


                    // dataObjectLogin.setUtype("O");
                    JSONArray jsonArray = jsonObject.optJSONArray("childlist");
                    ArrayList<CommonParserChildObject> list = new ArrayList<CommonParserChildObject>();
                    if (jsonArray != null && jsonArray.length() > 0) {
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject jObject = jsonArray.getJSONObject(i);
                            if (jObject != null) {
                                CommonParserChildObject dataObjectLoginChildList = new CommonParserChildObject();
                                dataObjectLoginChildList.setChildId(HttpConnectionUrl.getJSONKeyvalue(jObject, "childId"));
                                dataObjectLoginChildList.setChildSessionId(HttpConnectionUrl.getJSONKeyvalue(jObject, "childSessionId"));
                                dataObjectLoginChildList.setChildType(HttpConnectionUrl.getJSONKeyvalue(jObject, "childType"));
                                dataObjectLoginChildList.setChildName(HttpConnectionUrl.getJSONKeyvalue(jObject, "childName"));
                                dataObjectLoginChildList.setDob(HttpConnectionUrl.getJSONKeyvalue(jObject, "dob"));
                                dataObjectLoginChildList.setAvatarId(HttpConnectionUrl.getJSONKeyvalue(jObject, "avatarId"));
                                dataObjectLoginChildList.setAge(HttpConnectionUrl.getJSONKeyvalue(jObject, "age"));
                                dataObjectLoginChildList.setAvatarImg(HttpConnectionUrl.getJSONKeyvalue(jObject, "avatarIMG"));

                                list.add(dataObjectLoginChildList);

                            }

                        }
                    }
                    dataObjectLogin.setRegisterChildListObjects(list);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        } catch (JSONException e) {
            e.printStackTrace();
            // onloginlistner.OnError("Something went wrong.");
        }
    }

    private OnLoginListner onloginlistner;

    public OnLoginListner getOnloginlistner() {
        return onloginlistner;
    }

    public void setOnloginlistner(OnLoginListner onloginlistner) {
        this.onloginlistner = onloginlistner;
    }

    public interface OnLoginListner {
        public void OnSuccess(CommonParserObject dataObjectLogin);

        public void OnError(String str_err);

        public void OnConnectTimeout();
    }

}
