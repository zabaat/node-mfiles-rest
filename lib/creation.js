
var createObject = function () {

    // Post the object data.
    $.ajax({
        url: "http://example.org/REST/objects/0.aspx",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            PropertyValues: [{
                    // Document name
                    PropertyDef: 0,
                    TypedValue: { DataType: 1, Value: "Invoice" }
                }, {
                    // "Single File" property
                    PropertyDef: 22,
                    TypedValue: { DataType: 8, Value: false }
                }, {
                    // Class.
                    PropertyDef: 100,
                    TypedValue: { DataType: 9, Lookup: { Item: 0 } }
                }],
            Files: []
        }),
        success: processDocument
    });
};

var processDocument = function (objectVersion) {
    alert( objectversion.Title + " created successfully." );
};


/*
Response!
{ Title: 'Invoice',
  EscapedTitleWithID: 'Invoice (ID 2927)',
  DisplayID: '2927',
  ObjVer: { Version: 1, ID: 2927, Type: 0 },
  Class: 0,
  CheckedOutAtUtc: '1601-01-01T00:00:00Z',
  CheckedOutAt: '1601-01-01T00:00:00Z',
  LastModified: '2016-11-03T23:05:56Z',
  ObjectCheckedOut: false,
  ObjectCheckedOutToThisUser: false,
  CheckedOutTo: 0,
  SingleFile: false,
  ThisVersionLatestToThisUser: true,
  CreatedUtc: '2016-11-03T23:05:56Z',
  Created: '2016-11-03T23:05:56Z',
  Files: [],
  VisibleAfterOperation: true,
  PathInIDView: '0\\2-1001\\2927\\S\\v1',
  LastModifiedDisplayValue: '11/3/2016 11:05 PM',
  CheckedOutAtDisplayValue: '1/1/1601 12:00 AM',
  CreatedDisplayValue: '11/3/2016 11:05 PM',
  ObjectVersionFlags: 0,
  Score: 0,
  LastAccessedByMe: '0001-01-01T08:00:00Z',
  AccessedByMeUtc: '2016-11-03T23:05:57Z',
  AccessedByMe: '2016-11-03T23:05:57Z',
  ObjectGUID: '{DFE2DF3F-1FF2-4EEB-B401-CA4AE15E4C08}' }
}
*/