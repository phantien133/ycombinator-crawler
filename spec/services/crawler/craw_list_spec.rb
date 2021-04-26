require "rails_helper"

RSpec.describe Crawler::CrawList do
  include CrawListTestHelper
  describe '.execute' do
    subject { Crawler::CrawList.execute(list_path: list_path, page: page) }

    let(:list_path) { '/best' }
    let(:page) { rand(1..10) }
    let(:stub_meta) { {} }

    before do
      allow_any_instance_of(Crawler::CrawMetaPost).to receive(:execute).and_return(stub_meta)
    end

    context 'when can\'t load target page' do
      context 'with connection error' do
        before { allow(Net::HTTP).to receive(:get).and_raise(SocketError) }

        it { is_expected.to eq response_result }
      end

      context 'with unexpected target reponse' do
        before { allow(Net::HTTP).to receive(:get).and_return('Unknown.') }

        it { is_expected.to eq response_result }
      end
    end

    context 'when got target html' do
      let(:more) { true }
      let(:list_posts) { rand(1..30).times.map { factory_post } }
      let(:template) { factory_target_template(posts: list_posts, more: more) }

      before do
        allow(Net::HTTP).to receive(:get).and_return(template)
      end

      it { expect(subject[:data].length).to eq list_posts.length }
      it 'craws meta data of all post' do
        expect(Crawler::CrawMetaPost).to receive(:execute).exactly(list_posts.length)
        subject
      end

      shared_examples_for 'craw correct data' do
        let(:list_posts) { [post] }
        let(:crawl_post) { subject[:data].first }

        it { expect(crawl_post.except(:votelinks)).to eq post.except(:votelinks) }
        it do
          expect(crawl_post[:votelinks]).
            to eq "#{Crawler::CrawList::BA_YCOM_HOST}/#{post[:votelinks]}"
        end
      end

      context 'with query page' do
        context 'without param page' do
          subject { Crawler::CrawList.execute(list_path: list_path) }

          it do
            url = URI("#{Crawler::CrawList::BA_YCOM_HOST}/#{list_path}?page=#{1}")
            expect(Net::HTTP).to receive(:get).with(url).exactly(1)
            subject
          end
        end

        context 'with param page' do
          it 'query correct page' do
            url = URI("#{Crawler::CrawList::BA_YCOM_HOST}/#{list_path}?page=#{page}")
            expect(Net::HTTP).to receive(:get).with(url).exactly(1)
            subject
          end
        end
      end

      context 'with fully athing node' do
        let(:post) { factory_post }

        it_behaves_like 'craw correct data'
      end

      context 'with fully athing missing site string' do
        let(:post) { factory_post.tap { |data| data[:site] = nil } }

        it_behaves_like 'craw correct data'
      end

      context 'when have no more page' do
        let(:more) { false }

        it { expect(subject[:more]).to eq false }
      end

      context 'when have more page' do
        let(:more) { true }

        it { expect(subject[:more]).to eq true }
      end
    end
  end
end
