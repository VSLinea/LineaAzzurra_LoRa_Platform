"use client"

import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2563eb'
  },
  subheader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e293b',
    padding: 5,
    backgroundColor: '#f8fafc'
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    minHeight: 30,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    fontWeight: 'bold'
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center'
  }
})

interface MaintenanceReportProps {
  month: string
  year: string
  data: {
    completedTasks: Array<{
      date: string
      task: string
      pool: string
      assignee: string
      notes?: string
    }>
    statistics: {
      totalTasks: number
      completedTasks: number
      pendingTasks: number
      averageCompletionTime: string
    }
  }
}

const MaintenanceReport: React.FC<MaintenanceReportProps> = ({ month, year, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Pool Maintenance Report</Text>
      <Text style={styles.subheader}>{month} {year}</Text>

      {/* Statistics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Statistics</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Total Tasks</Text>
            <Text style={styles.tableCell}>Completed</Text>
            <Text style={styles.tableCell}>Pending</Text>
            <Text style={styles.tableCell}>Avg. Completion Time</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{data.statistics.totalTasks}</Text>
            <Text style={styles.tableCell}>{data.statistics.completedTasks}</Text>
            <Text style={styles.tableCell}>{data.statistics.pendingTasks}</Text>
            <Text style={styles.tableCell}>{data.statistics.averageCompletionTime}</Text>
          </View>
        </View>
      </View>

      {/* Completed Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed Maintenance Tasks</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Task</Text>
            <Text style={styles.tableCell}>Pool</Text>
            <Text style={styles.tableCell}>Assignee</Text>
            <Text style={styles.tableCell}>Notes</Text>
          </View>
          {data.completedTasks.map((task, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{task.date}</Text>
              <Text style={styles.tableCell}>{task.task}</Text>
              <Text style={styles.tableCell}>{task.pool}</Text>
              <Text style={styles.tableCell}>{task.assignee}</Text>
              <Text style={styles.tableCell}>{task.notes || '-'}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} by Pool Monitor System
      </Text>
    </Page>
  </Document>
)

export default MaintenanceReport 