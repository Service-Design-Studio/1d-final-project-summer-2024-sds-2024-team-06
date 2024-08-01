require 'rails_helper'

RSpec.describe GoogleCloudStorageService, type: :service do
  let(:file) { double('file', path: 'path/to/file') }
  let(:filename) { 'test_file.txt' }
  let(:bucket) { double('bucket') }
  let(:storage) { double('storage', bucket: bucket) }
  let(:gcs_file) { double('gcs_file', signed_url: 'http://example.com/signed_url') }

  before do
    allow(Google::Cloud::Storage).to receive(:new).and_return(storage)
  end

  describe '.upload_file' do
    it 'uploads the file to the bucket' do
      expect(bucket).to receive(:create_file).with(file.path, filename)
      GoogleCloudStorageService.upload_file(file, filename)
    end
  end

  describe '.file_url' do
    it 'returns the signed URL for the file' do
      allow(bucket).to receive(:file).with(filename).and_return(gcs_file)
      expect(GoogleCloudStorageService.file_url(filename)).to eq('http://example.com/signed_url')
    end
  end
end
