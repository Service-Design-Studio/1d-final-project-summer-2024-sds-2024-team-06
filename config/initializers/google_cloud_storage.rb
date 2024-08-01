require "google/cloud/storage"

Google::Cloud::Storage.configure do |config|
  config.project_id  = "team6sds"
  config.credentials = "./team6sds-0d481ea28974.json"
end

GOOGLE_CLOUD_BUCKET = Google::Cloud::Storage.new.bucket "art_storage"
