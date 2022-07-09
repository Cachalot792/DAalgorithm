var templateA = {
    name:"M",
    member:[1,2,3],
    preference:[[4,5,7,0,6],[5,6,4,0,7],[4,7,0,6,5]]
};
var templateB = {
    name:"W",
    member:[4,5,6,7],
    preference:[[3,2,1,0],[3,1,2,0],[3,1,0,2],[1,2,0,3]]
};
//希望表の記入漏れチェック等は別の関数で前もって調べておく
//当アルゴリズム内では空集合は0しか受け付けないので事前に空集合を0に置換しておく必要がある(記入漏れチェック時に対応可能)
function DeferredAcceptanceAlgorithm(activeGroupMemberArray,activeGroupPreferenceArray,passiveGroupMemberArray,passiveGroupPreferenceArray) {
    var activeGroupMemberCount = activeGroupMemberArray.length;
    var passiveGroupMemberCount = passiveGroupMemberArray.length;
    var passiveGroupKeepRankArray = new Array(passiveGroupMemberCount)
    var isSucceededMatchingArray = new Array(activeGroupMemberCount).fill(false);
    var tryMatchingTimesArray = new Array(activeGroupMemberCount).fill(0);
    var activeGroupMatchingPersonRankArray = new Array(activeGroupMemberCount).fill(0);

    //アプローチされる側の空集合の希望順位を探して格納
    for(i=0;i<passiveGroupMemberCount;i++){
    passiveGroupKeepRankArray[i] = passiveGroupPreferenceArray[i].indexOf(0);
    };

    //アプローチ側全員がマッチング終了するまで続ける
    do{
    //アプローチ側のメンバーそれぞれについて↓
    for(i=0;i<activeGroupMemberCount;i++){
        console.log(i + ":" + isSucceededMatchingArray);
        //まだマッチングが完了していない場合に処理する
        if(isSucceededMatchingArray[i] == false){
        //その人がマッチング完了するまで続ける
            for(j=1;j<=passiveGroupMemberCount+1;j++){
                var chosenPersonName = activeGroupPreferenceArray[i][tryMatchingTimesArray[i]];  //選ばれた人の名前
                //①選ばれた人の名前が空集合ならマッチング成功(終了)&ループ抜け出し
                if(chosenPersonName == 0){
                activeGroupMatchingPersonRankArray[i] = tryMatchingTimesArray[i]; //希望順位何位の人とマッチングできたか保持
                isSucceededMatchingArray[i] = true;
                break;
                };
                var chosenPersonPosition = passiveGroupMemberArray.indexOf(chosenPersonName); //選ばれた側の人がメンバー配列で何番目か
                var approarchPersonName = activeGroupMemberArray[i];  //選んだ側（アプローチした側）の人の名前
                var approarchPersonRank = passiveGroupPreferenceArray[chosenPersonPosition].indexOf(approarchPersonName); //選んだ人の選ばれた人にとっての希望順位
                //②選ばれた人にとってその人を選ぶことが現キープより良い選択ならマッチング成功&試行回数+1&ループ抜け出し
                if(approarchPersonRank < passiveGroupKeepRankArray[chosenPersonPosition]){
                //選ばれた人の元キープの名前が空集合で無かった場合、元キープのマッチングを未完了に変更
                var chosenPearsonKeepName = passiveGroupPreferenceArray[chosenPersonPosition][passiveGroupKeepRankArray[chosenPersonPosition]];
                if(chosenPearsonKeepName != 0){
                    isSucceededMatchingArray[activeGroupMemberArray.indexOf(chosenPearsonKeepName)] = false;
                }
                passiveGroupKeepRankArray[chosenPersonPosition] = approarchPersonRank;  //キープ順位を更新
                activeGroupMatchingPersonRankArray[i] = tryMatchingTimesArray[i]; //希望順位何位の人とマッチングできたか保持
                isSucceededMatchingArray[i] = true;
                tryMatchingTimesArray[i] = tryMatchingTimesArray[i] + 1;
                break;
                //③マッチング失敗なら試行回数+1&ループ続行
                }else{
                tryMatchingTimesArray[i] = tryMatchingTimesArray[i] + 1;
                };
            };
        };
    };
    }while(isSucceededMatchingArray.filter(boolean => boolean == true).length < activeGroupMemberCount);
    for(i=0;i<activeGroupMemberCount;i++){
    console.log("「" + activeGroupMemberArray[i] + "」は希望順位" + (activeGroupMatchingPersonRankArray[i] + 1) + "位の「"　+ activeGroupPreferenceArray[i][activeGroupMatchingPersonRankArray[i]] + "」とマッチング");
    };
};
DeferredAcceptanceAlgorithm(templateA.member,templateA.preference,templateB.member,templateB.preference);
