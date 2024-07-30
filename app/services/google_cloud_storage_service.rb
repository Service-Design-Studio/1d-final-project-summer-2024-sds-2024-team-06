# app/services/google_cloud_storage_service.rb
class GoogleCloudStorageService
  BUCKET = "art_storage"

  def self.upload_file(file, filename)
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket(BUCKET)
    bucket.create_file(file.path, filename)
  end

  def self.file_url(filename)
    storage = Google::Cloud::Storage.new
    bucket = storage.bucket(BUCKET)
    file = bucket.file(filename)
    file.signed_url
  end
end
