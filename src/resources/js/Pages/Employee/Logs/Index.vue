<style scoped>
.avatar {
  width: 80px;
  height: 80px;
  top: 32px;
  left: 50%;
  margin-top: -40px; /* Half the height */
  margin-left: -40px; /* Half the width */
}

.author-avatar {
  width: 34px;
  min-width: 34px;
  margin-right: 16px;
}

.log-item:last-child {
  border-bottom: 0;
}
</style>

<template>
  <layout :notifications="notifications">
    <div class="ph2 ph0-ns">
      <breadcrumb
        :with-box="true"
        :root-url="'/' + $page.props.auth.company.id + '/dashboard'"
        :root="$t('app.breadcrumb_dashboard')"
        :previous-url="'/' + $page.props.auth.company.id + '/employees/' + employee.id"
        :previous="employee.name"
      >
        {{ $t('app.breadcrumb_employee_logs') }}
      </breadcrumb>

      <!-- BODY -->
      <div class="mw7 center br3 mb5 bg-white box relative z-1">
        <div class="relative pt5">
          <!-- AVATAR -->
          <avatar :avatar="employee.avatar" :size="80" :class="'avatar absolute br-100 db center'" />

          <h2 class="pa3 tc normal mb4">
            {{ $t('employee.audit_log_title') }}
          </h2>

          <div class="relative pv2 ph2 bb bb-gray">
            <input type="hidden" name="url" id="url" class="form-control" :value="url">
            <input type="hidden" name="current_search" id="current_search" class="form-control" :value="search">
            <select
              id="search"
              v-model="filterByLogType"
              name="search"
              placeholder="Search for a log"
              class="br2 f5 w-100 ba b--black-40 pa2 outline-0"
            >
              <option id="show_all_log_types" value="show_all_log_types">Filter by log type</option>
              <option v-for="type in types" :value="type.action" :key="type.action" :id="type.action">
                {{ toTitleCase(type.action) }} ({{ type.number_of_logs }})
              </option>
            </select>
          </div>

          <ul class="list pl0 mt0 mb0 center" data-cy="logs-list">
            <li v-for="log in filteredLogs" :key="log.id" class="flex items-center lh-copy pa3 bb b--black-10 log-item">
              <!-- avatar -->
              <avatar :avatar="log.author.avatar" :size="34" :class="'author-avatar br-100'" />

              <div>
                <div class="db f7 mb2">
                  <!-- log author -->
                  <inertia-link v-if="log.author.id" :href="log.author.url">{{ log.author.name }}</inertia-link>
                  <span v-else>
                    {{ log.author.name }}
                  </span>
                </div>
                <!-- log content -->
                <div class="mb1">
                  {{ log.localized_content }}
                </div>

                <!-- log date -->
                <p class="ma0 f7 gray">
                  {{ log.localized_audited_at }}
                </p>
              </div>
            </li>
          </ul>

          <!-- Pagination -->
          <div class="center cf pa3">
            <inertia-link
              v-show="paginator.previousPageUrl"
              class="fl dib"
              :href="paginator.previousPageUrl"
              title="Previous"
            >
              &larr; {{ $t('app.previous') }}
            </inertia-link>
            <inertia-link v-show="paginator.nextPageUrl" class="fr dib" :href="paginator.nextPageUrl" title="Next">
              {{ $t('app.next') }} &rarr;
            </inertia-link>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from '@/Shared/Layout';
import Breadcrumb from '@/Shared/Layout/Breadcrumb';
import Avatar from '@/Shared/Avatar';
import { toTitleCase, logTypes } from './types';

export default {
  components: {
    Layout,
    Breadcrumb,
    Avatar,
  },

  props: {
    notifications: {
      type: Array,
      default: null,
    },
    employee: {
      type: Object,
      default: null,
    },
    logs: {
      type: Array,
      default: null,
    },
    types: {
      type: Array,
      default: null,
    },
    search: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: null,
    },
    paginator: {
      type: Object,
      default: null,
    },
  },
  create() {
    window.addEventListener("load", this.onWindowLoad);
  },
  data() {
    return {
      filterByLogType: '',
      logTypes,
    };
  },
  computed: {
    filteredLogs() {
      if (!this.filterByLogType) return this.logs;
      window.location.href = this.url + '?filterByLogType=' + this.filterByLogType;
      return false;
    },
  },
  methods: {
    toTitleCase,
    onWindowLoad() {
      console.log("window load event");
      if(document.getElementById("current_search").value) {
        document.getElementById(document.getElementById("current_search").value).selected=true;
      }
    },
  },
};

</script>
