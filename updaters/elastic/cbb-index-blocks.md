# delete index
curl -XDELETE 'http://milleria.org:9200/cbb/'

# PUT new index
curl -XPUT 'milleria.org:9200/cbb?pretty' -H 'Content-Type: application/json' -d'
{
          "settings": {
            "analysis": {
                "tokenizer": {
                    "comma": {
                        "type": "pattern",
                        "pattern": ","
                    }
                },
                "analyzer": {
                    "comma": {
                        "type": "custom",
                        "tokenizer": "comma",
                        "filter": ["lowercase", "trim"]
                    }
                }
            }
        },
    "mappings": {
      "bit": {
        "properties": {
          "bit": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "created_at": {
            "type": "date"
          },
          "elucidation": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "episode": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
"episode_guests": {
                        "type": "keyword",
                        "fields": {
                            "comma_del": {
                                "type": "text",
                                "analyzer": "comma",
                                "fielddata": true
                            }
                        }
                    },
          "episode_title": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "holding": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "instance": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              }
            }
          },
          "location_id": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "location_type": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "slug_earwolf": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
"tags": {
                        "type": "keyword",
                        "fields": {
                            "comma_del": {
                                "type": "text",
                                "analyzer": "comma",
                                "fielddata": true
                            }
                        }
                    },
          "tend": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "tstart": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "updated_at": {
            "type": "date"
          }
        }
      }
    }
}
'